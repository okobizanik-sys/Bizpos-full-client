"use client";

import React from "react";
import { useBranch } from "@/hooks/store/use-branch";
import { useStore } from "@/hooks/store/use-store";
import { useSearchParams } from "next/navigation";
import {
  getStocks,
  getStocksByProduct,
  getStocksCount,
} from "@/services/stock";
import { StockPayload } from "../stock-transfer/transfer-products/transfer-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StockSelector } from "../stock-transfer/transfer-products/stock-selector";
import {
  ArrowLeftRight,
  LucideArrowRightLeft,
  QrCode,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { BillDetailsForm } from "./form";
import { usePOSStore } from "@/hooks/store/use-pos-store";
import { useToast } from "@/components/ui/use-toast";
import { OrderSelector } from "@/components/admin-panel/order-selector";
import { getOrdersWithItems } from "@/services/order";
import { OrderItems } from "@/types/shared";
import { ExchangeDetailsForm } from "./exchange-form";
import { useBarcodeScanner, playBeep } from "./barcode-scanner.hook";

export type POSItem = {
  id?: bigint;
  barcode: string;
  productId: bigint;
  name: string;
  colorName: string;
  sizeName: string;
  categoryName?: string;
  sku?: string;
  condition?: string;
  quantity: number;
  cost?: number;
  selling_price: number;
  colorId?: number;
  sizeId?: number;
};

export type OrderWithItem = {
  items: OrderItems[];
  ordersId: number;
  customerId: number;
  orderId: string;
  customer: string;
  phone: string;
  address: string;
  discount?: number;
  vat?: number;
  delivery_charge?: number;
  due_amount?: number;
  paid_amount?: number;
  payment_method?: number;
  sub_total?: number;
  total?: number;
};

export const POSItemSelector = () => {
  const searchParams = useSearchParams();
  const userId = (searchParams.get("userId") || "").trim();
  const isPublicCartMode = Boolean(userId);
  const configuredBranchId = Number(process.env.NEXT_PUBLIC_STOREFRONT_BRANCH_ID || "1");
  const publicBranchId =
    Number.isFinite(configuredBranchId) && configuredBranchId > 0
      ? Math.floor(configuredBranchId)
      : 1;

  const branch = useStore(useBranch, (state) => state.branch);
  const branchStore = useStore(useBranch, (state) => state);
  const {
    itemList,
    addItem,
    removeItem,
    setOrderId,
    orderId,
    updateItemQty,
    exchangeItemList,
    addExchangeItem,
    moveToReturn,
    returnItemList,
    addItemToExchange,
    addExchangeItemList,
    resetExchangeItemList,
    resetAddExchangeItemList,
    resetReturnItemList,
    resetItemList,
  } = usePOSStore();

  const [stocks, setStocks] = React.useState<StockPayload[]>([]);
  const [orders, setOrders] = React.useState<OrderWithItem[] | null>(null);
  const [loadingOrders, setLoadingOrders] = React.useState(false);
  const [selectedBarcode, setSelectedBarcode] = React.useState<string | null>(
    null,
  );
  const [exgOrder, setExgOrder] = React.useState<OrderWithItem>();
  const [qtyLimit, setQtyLimit] = React.useState<number>(0);
  const [exgQtyLimit, setExgQtyLimit] = React.useState<number>(0);
  const [exchangeOpen, setExchangeOpen] = React.useState<boolean>(false);
  const hydratedUserRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!isPublicCartMode) return;
    if (!branchStore) return;
    if (Number(branch?.id || 0) === publicBranchId) return;

    branchStore.setBranch({
      id: publicBranchId,
      name: "Online Branch",
      address: "",
      phone: "",
      root: false,
    });
  }, [isPublicCartMode, branch?.id, branchStore, publicBranchId]);

  React.useEffect(() => {
    if (!isPublicCartMode || !userId) return;
    if (hydratedUserRef.current === userId) return;

    const hydrateCartIntoPos = async () => {
      try {
        const response = await fetch(
          `/api/v1/cart?userId=${encodeURIComponent(userId)}&coupon=`
        );
        const payload = await response.json().catch(() => null);
        const cartDetails = payload?.data?.cartDetails || [];

        resetItemList();
        for (const item of cartDetails) {
          const product = item?.product || {};
          const matchedInventory =
            product?.inventoryRef?.find(
              (inv: any) =>
                String(inv?.inventoryID || "") === String(item?.barcode || "") ||
                String(inv?._id || "") === String(item?.barcode || "")
            ) || null;
          const inventory = item?.inventory || matchedInventory || {};
          const barcode = String(
            inventory.inventoryID || inventory.barcode || item?.barcode || ""
          );
          const productId = Number(product.productId || product._id || 0);

          if (!barcode || !productId) continue;

          addItem({
            barcode,
            productId: productId as unknown as bigint,
            name: product.name || "",
            colorId: undefined,
            colorName: inventory.color || "-",
            sizeId: undefined,
            sizeName: inventory.level || "-",
            quantity: Number(item.quantity || 1),
            selling_price: Number(product.price || 0),
            cost: 0,
          });
        }

        if (cartDetails.length > 0 && !orderId) {
          await setOrderId();
        }

        hydratedUserRef.current = userId;
      } catch (error) {
        console.error("Failed to hydrate POS cart from storefront", error);
      }
    };

    hydrateCartIntoPos();
  }, [isPublicCartMode, userId, addItem, resetItemList, setOrderId, orderId]);

  React.useEffect(() => {
    if (!branch?.id) return;

    const loadStocks = async () => {
      if (isPublicCartMode) {
        const allBranchStocks = await getStocks({ where: {} });
        // @ts-ignore
        setStocks(allBranchStocks || []);
        return;
      }

      const branchStocks = await getStocksByProduct({
        where: { branchId: Number(branch.id) },
      });
      // @ts-ignore
      setStocks(branchStocks || []);
    };
    loadStocks();

    // Reset exchange data when branch changes and lazy-load orders only when exchange opens
    setOrders(null);
    setExgOrder(undefined);
    resetExchangeItemList();
    resetAddExchangeItemList();
    resetReturnItemList();
  }, [
    branch?.id,
    isPublicCartMode,
    resetAddExchangeItemList,
    resetExchangeItemList,
    resetReturnItemList,
  ]);

  React.useEffect(() => {
    if (!branch?.id || !exchangeOpen || orders !== null || loadingOrders) return;

    setLoadingOrders(true);
    getOrdersWithItems({
      where: { "branches.id": branch.id },
    })
      .then((data) => {
        setOrders(data || []);
      })
      .finally(() => {
        setLoadingOrders(false);
      });
  }, [branch?.id, exchangeOpen, orders, loadingOrders]);

  // console.log("itemList from pos items selector:", itemList);

  const { toast } = useToast();

  const barcodeSelected = async (code: string | null | void) => {
    // console.log("barcode selected........");
    if (code) {
      setSelectedBarcode(code);
      getStocksCount({
        where: isPublicCartMode
          ? { barcode: code }
          : { barcode: code, branch_id: branch?.id },
      }).then((data) => {
        const itemInList = itemList.find((item) => item.barcode === code);
        setQtyLimit(itemInList ? data - itemInList.quantity : data);
      });

      const stock = stocks.find((stock) => stock.barcode === code);
      if (stock) {
        addItem({
          barcode: stock.barcode,
          productId: stock.productId,
          name: stock.name,
          colorId: stock.color_id,
          colorName: stock.colorName || "-",
          sizeId: stock.size_id,
          sizeName: stock.sizeName || "-",
          quantity: 1,
          selling_price: stock.selling_price,
          cost: stock.cost,
        });
        playBeep(true);
        // setSelectedQty(0);
        // setQtyModalOpen(false);
        await setOrderId();
      } else {
        // Barcode not found in this branch's stock
        playBeep(false);
        toast({
          title: "Barcode not found",
          description: `"${code}" is not available in this branch's stock.`,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const barcodeExchangeSelected = (code: string | null | void) => {
    if (code) {
      setSelectedBarcode(code);
      getStocksCount({
        where: isPublicCartMode
          ? { barcode: code }
          : { barcode: code, branch_id: branch?.id },
      }).then((data) => {
        const itemInList = exchangeItemList.find(
          (item) => item.barcode === code,
        );
        setExgQtyLimit(itemInList ? data - itemInList.quantity : data);
      });
      // setExgQtyModalOpen(true);

      const stock = stocks.find((stock) => stock.barcode === code);
      if (stock) {
        addItemToExchange({
          productId: Number(stock.productId),
          productName: stock.name,
          sellingPrice: stock.selling_price,
          quantity: 1,
          // quantity: selectedQty,
          colorName: stock.colorName,
          sizeName: stock.sizeName,
          barcode: stock.barcode,
          colorId: stock.color_id,
          sizeId: stock.size_id,
        });
        playBeep(true);
        // setSelectedQty(0);
        // setExgQtyModalOpen(false);
      } else {
        playBeep(false);
        toast({
          title: "Barcode not found",
          description: `"${code}" is not available in this branch's stock.`,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  // const addStockToExchangeItemList = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const stock = stocks.find((stock) => stock.barcode === selectedBarcode);
  //   if (stock) {
  //     addItemToExchange({
  //       productId: Number(stock.productId),
  //       productName: stock.name,
  //       sellingPrice: stock.selling_price,
  //       quantity: 1,
  //       // quantity: selectedQty,
  //       colorName: stock.colorName,
  //       sizeName: stock.sizeName,
  //       barcode: stock.barcode,
  //       colorId: stock.color_id,
  //       sizeId: stock.size_id,
  //     });
  //     setSelectedQty(0);
  //     setExgQtyModalOpen(false);
  //   }
  // };

  const setSelectedOrder = (id: string | null | void) => {
    const foundOrder = orders?.find((order) => order.orderId === id);
    setExgOrder(foundOrder);
    if (foundOrder) {
      resetExchangeItemList();
      resetAddExchangeItemList();
      resetReturnItemList();
      foundOrder.items.map((item) => addExchangeItem(item));
    }
  };

  // Hardware barcode scanner — fires when a physical scanner types fast + Enter
  // In POS mode  → calls barcodeSelected  (adds to cart)
  // In Exchange mode → calls barcodeExchangeSelected (adds to exchange list)
  useBarcodeScanner({
    onScan: exchangeOpen ? barcodeExchangeSelected : barcodeSelected,
  });

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {/* Left panel */}
          <div className="flex flex-col">
            <Card className="flex justify-between items-end p-4 m-2 rounded-lg">
              {exchangeOpen ? (
                <div>
                  <OrderSelector
                    orders={orders}
                    setSelectedOrder={setSelectedOrder}
                  />
                </div>
              ) : (
                <div className="w-1/2 relative">
                  <StockSelector
                    stocks={stocks}
                    setSelectedStock={barcodeSelected}
                    qtyLimit={qtyLimit}
                  />
                  <QrCode className="opacity-60 absolute right-8 -translate-y-8" />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  disabled={isPublicCartMode}
                  onClick={() => {
                    setExchangeOpen((prev) => !prev);
                  }}
                  className={`${exchangeOpen && "bg-black hover:bg-slate-800"}`}
                >
                  {exchangeOpen ? (
                    <span>POS (F3)</span>
                  ) : (
                    <span className="flex gap-1 items-center">
                      <LucideArrowRightLeft /> Exchange (F7)
                    </span>
                  )}
                </Button>
                {/* <Button className="flex gap-1 items-center bg-[#D1FFCA] hover:bg-[#bcf9b3] text-black/90">
                  <PlusCircle /> <span>Non Inventory (F6)</span>
                </Button> */}
              </div>
            </Card>
          </div>

          {/* Exchange */}
          {exchangeOpen ? (
            <div>
              {/* Order Details */}
              <Card className=" p-4 m-2 mt-0 rounded-lg min-h-[calc(100vh-500px)] overflow-scroll no-scrollbar">
                <Table className="rounded-lg overflow-hidden">
                  <TableHeader className="bg-primary">
                    <TableRow>
                      {/* <TableHead className="h-8 text-white">#</TableHead> */}
                      <TableHead className="h-8 text-white">Barcode</TableHead>
                      <TableHead className="h-8 text-white">
                        Product Name
                      </TableHead>
                      <TableHead className="h-8 text-white">Color</TableHead>
                      <TableHead className="h-8 text-white">
                        Level / Size
                      </TableHead>
                      <TableHead className="h-8 text-white">Price</TableHead>
                      <TableHead className="h-8 text-white">Qty</TableHead>
                      <TableHead className="h-8 text-white">Total</TableHead>
                      <TableHead className="h-8 text-white"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {exchangeItemList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.barcode}</TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.colorName}</TableCell>
                        <TableCell>{item.sizeName}</TableCell>
                        <TableCell>{item.sellingPrice}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {Number(item.sellingPrice) * Number(item.quantity)}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            size="icon"
                            className="bg-[#FF2DEA] rounded-full w-6 h-6"
                            onClick={() => {
                              moveToReturn(item.barcode);
                            }}
                          >
                            <ArrowLeftRight size={16} />
                          </Button>{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Select Product */}
              <Card className=" p-4 m-2 rounded-lg overflow-scroll no-scrollbar">
                <div className="w-1/2 relative mb-4">
                  <Label>Select Product</Label>
                  <StockSelector
                    stocks={stocks}
                    setSelectedStock={barcodeExchangeSelected}
                    qtyLimit={exgQtyLimit}
                  />
                  <QrCode className="opacity-60 absolute right-8 -translate-y-8" />
                </div>
                <Table className="rounded-lg overflow-hidden">
                  <TableHeader className="bg-primary">
                    <TableRow>
                      {/* <TableHead className="h-8 text-white">#</TableHead> */}
                      <TableHead className="h-8 text-white">Barcode</TableHead>
                      <TableHead className="h-8 text-white">
                        Product Name
                      </TableHead>
                      <TableHead className="h-8 text-white">Color</TableHead>
                      <TableHead className="h-8 text-white">
                        Level / Size
                      </TableHead>
                      <TableHead className="h-8 text-white">Price</TableHead>
                      <TableHead className="h-8 text-white">Qty</TableHead>
                      <TableHead className="h-8 text-white">Total</TableHead>
                      <TableHead className="h-8 text-white"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {addExchangeItemList.map((item, index) => (
                      <TableRow key={item.barcode}>
                        {/* <TableCell className="py-2">{index + 1}</TableCell> */}
                        <TableCell className="py-2">{item.barcode}</TableCell>
                        <TableCell className="py-2 w-60">
                          {item.productName}
                        </TableCell>
                        <TableCell className="py-2">{item.colorName}</TableCell>
                        <TableCell className="py-2">{item.sizeName}</TableCell>
                        <TableCell className="py-2">
                          {Number(item.sellingPrice)}
                        </TableCell>
                        <TableCell className="py-2 w-20 flex gap-2 items-center">
                          <Input
                            // className="w-12"
                            type="number"
                            max={exgQtyLimit}
                            min={1}
                            value={item.quantity}
                            required
                            onChange={(e) =>
                              updateItemQty(
                                item.barcode,
                                parseInt(e.target.value, 10) || 1,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="py-2">
                          {Number(item.quantity) * Number(item.sellingPrice)}
                        </TableCell>
                        <TableCell className="w-8">
                          <Button
                            size="icon"
                            className="w-6 h-6 rounded-full bg-red-200 hover:bg-red-600 text-red-600 hover:text-white"
                            onClick={() => removeItem(item.barcode)}
                          >
                            <Trash2 className="" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Return Product */}
              <Card className=" p-4 m-2 rounded-lg overflow-scroll no-scrollbar">
                <h2>Return Items</h2>
                <Table className="rounded-lg overflow-hidden">
                  <TableHeader className="bg-primary">
                    <TableRow>
                      {/* <TableHead className="h-8 text-white">#</TableHead> */}
                      <TableHead className="h-8 text-white">Barcode</TableHead>
                      <TableHead className="h-8 text-white">
                        Product Name
                      </TableHead>
                      <TableHead className="h-8 text-white">Color</TableHead>
                      <TableHead className="h-8 text-white">
                        Level / Size
                      </TableHead>
                      <TableHead className="h-8 text-white">Price</TableHead>
                      <TableHead className="h-8 text-white">Qty</TableHead>
                      <TableHead className="h-8 text-white">Total</TableHead>
                      <TableHead className="h-8 text-white"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {returnItemList.map((item, index) => (
                      <TableRow key={index}>
                        {/* <TableCell className="py-2">{index + 1}</TableCell> */}
                        <TableCell className="py-2">{item.barcode}</TableCell>
                        <TableCell className="py-2 w-60">
                          {item.productName}
                        </TableCell>
                        <TableCell className="py-2">{item.colorName}</TableCell>
                        <TableCell className="py-2">{item.sizeName}</TableCell>
                        <TableCell className="py-2">
                          {Number(item.sellingPrice)}
                        </TableCell>
                        <TableCell className="py-2 w-20 flex gap-2 items-center">
                          <Input
                            // className="w-12"
                            type="number"
                            max={exgQtyLimit}
                            min={1}
                            value={item.quantity}
                            required
                            onChange={(e) =>
                              updateItemQty(
                                item.barcode,
                                parseInt(e.target.value, 10) || 1,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="py-2">
                          {Number(item.quantity) * Number(item.sellingPrice)}
                        </TableCell>
                        <TableCell className="w-8">
                          <Button
                            size="icon"
                            className="w-6 h-6 rounded-full bg-red-200 hover:bg-red-600 text-red-600 hover:text-white"
                            onClick={() => removeItem(item.barcode)}
                          >
                            <Trash2 className="" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          ) : (
            <Card className="p-4 m-2 mt-0 rounded-lg">
              <div className=" mt-2 h-[calc(100vh-260px)] overflow-scroll no-scrollbar">
                <Table className="rounded-lg overflow-hidden">
                  <TableHeader className="bg-primary">
                    <TableRow>
                      {/* <TableHead className="h-8 text-white">SL</TableHead> */}
                      <TableHead className="h-8 w-1/12 text-white">
                        Barcode
                      </TableHead>
                      <TableHead className="h-8 w-3/12 text-white">
                        Product Name
                      </TableHead>
                      <TableHead className="h-8 w-2/12 text-white">
                        Color
                      </TableHead>
                      <TableHead className="h-8 w-2/12 text-white">
                        Level / Size
                      </TableHead>
                      <TableHead className="h-8 w-1/12 text-white">
                        Price
                      </TableHead>
                      <TableHead className="h-8 w-1/12 text-white">
                        Qty
                      </TableHead>
                      <TableHead className="h-8 w-1/12 text-white">
                        Total
                      </TableHead>
                      <TableHead className="h-8 w-1/12 text-white"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {itemList.map((item, index) => (
                      <TableRow key={item.barcode}>
                        {/* <TableCell className="py-2">{index + 1}</TableCell> */}
                        <TableCell className="py-2">{item.barcode}</TableCell>
                        <TableCell className="py-2 w-60">{item.name}</TableCell>
                        <TableCell className="py-2">{item.colorName}</TableCell>
                        <TableCell className="py-2">{item.sizeName}</TableCell>
                        <TableCell className="py-2">
                          {Number(item.selling_price)}
                        </TableCell>
                        <TableCell className="py-2 w-20 flex gap-2 items-center">
                          <Input
                            type="number"
                            max={qtyLimit}
                            min={1}
                            value={item.quantity}
                            required
                            onChange={(e) =>
                              updateItemQty(
                                item.barcode,
                                parseInt(e.target.value, 10) || 1,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="py-2">
                          {Number(item.quantity) * Number(item.selling_price)}
                        </TableCell>
                        <TableCell className="w-8">
                          <Button
                            size="icon"
                            className="w-6 h-6 rounded-full bg-red-200 hover:bg-red-600 text-red-600 hover:text-white"
                            onClick={() => removeItem(item.barcode)}
                          >
                            <Trash2 className="" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </div>

        {/* Right panel */}
        {exchangeOpen ? (
          <Card className="col-span-3 p-4 m-2 ml-0 rounded-lg">
            <ExchangeDetailsForm order={exgOrder} />
          </Card>
        ) : (
          <Card className="col-span-3 p-6 m-2 ml-0 rounded-lg">
            <div className="w-full flex justify-between mb-4">
              <p className="w-1/2 font-semibold">Bill Details</p>
              {orderId && (
                <p className="text-base opacity-80 font-normal">#{orderId}</p>
              )}
            </div>
            <BillDetailsForm />
          </Card>
        )}
      </div>

      {/* Dialogue box */}
      {/* <Dialog open={qtyModalOpen} onOpenChange={setQtyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Quantity (In Stock: {qtyLimit})</DialogTitle>
          </DialogHeader>
          <form onSubmit={addStockToItemList} className="flex gap-2">
            <Input
              className="w-[200px]"
              type="number"
              max={qtyLimit}
              min={1}
              value={selectedQty}
              required
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
            />
            <Button className="flex-1" type="submit">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}

      {/* Exchange Dialogue box */}
      {/* <Dialog open={exgQtyModalOpen} onOpenChange={setExgQtyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Quantity (In Stock: {exgQtyLimit})</DialogTitle>
          </DialogHeader>
          <form onSubmit={addStockToExchangeItemList} className="flex gap-2">
            <Input
              className="w-[200px]"
              type="number"
              max={exgQtyLimit}
              min={1}
              value={selectedQty}
              required
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
            />
            <Button className="flex-1" type="submit">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}
    </>
  );
};
