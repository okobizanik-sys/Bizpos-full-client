

// import { getUser } from "@/services/auth";
// import { getCartProducts } from "@/services/cart";
// import NavBar from "@/components/pages/header/NavBar/NavBar";
import LottieAnimationForThankyou from "@/utilits/lottieAnimationForThankyou";

const ThankYou = async () => {
  // const [productsByUser, setProductsByUser] = useState<TResponse | null>(null);

  // const coupon = "";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = await getUser();
  //       const userId = user?.id;
  //       await getCartProducts(userId, coupon).then((data) =>
  //         setProductsByUser(data)
  //       );
  //     } catch (error) {
  //       console.error("Error fetching user or cart:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const user = await getUser();
  // const productsByUser = await getCartProducts(user?.id);

  return (
    <>
      {/* <NavBar userCartProducts={productsByUser?.data} /> */}
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10 lg:py-20">
       <LottieAnimationForThankyou/>
      </div>
    </>
  );
};

export default ThankYou;
