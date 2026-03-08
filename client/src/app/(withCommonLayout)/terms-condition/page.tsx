// import NavBar from "@/components/pages/header/NavBar/NavBar";
// import { getUser } from "@/services/auth";
// import { getCartProducts } from "@/services/cart";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Unicrescent | Terms-condition",
  description: "Best E-commerce platform in BD",
};

const TermCondition = async () => {
  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="Container py-10 ">
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="text-2xl lg:text-4xl font-semibold text-[#262626] text-center mt-14 lg:mt-0">
            Terms and Conditions
          </div>

          <div className="policy-page-text ">
            Welcome to UniCrescent.com also hereby known as “we”, “us” or
            “UNICRESCENT”. Please read these Terms & conditions carefully before
            using this Site. By using the Site, you hereby accept these terms
            and conditions and represent that you agree to comply with these
            terms and conditions (the “User Agreement”). This User Agreement is
            deemed effective upon your use of the Site which signifies your
            acceptance of these terms. If you do not agree to be bound by this
            User Agreement please do not access, register with or use this Site.
            This Site is owned and operated by UNICRESCENT.
          </div>

          <div className="policy-page-text ">
            The Site reserves the right to change, modify, add, or remove
            portions of these Terms and Conditions at any time without any prior
            notification. Changes will be effective when posted on the Site with
            no other notice provided. Please check these Terms and Conditions
            regularly for updates. Your continued use of the Site following the
            posting of changes to Terms and Conditions of use constitutes your
            acceptance of those changes.
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Introduction
            </div>
            <div className="text-red-600">
              The domain name www.UniCrescent.com (referred to as "Website") is
              owned by "UNICRESCENT" a company incorporated under the Companies
              Act, 1994(Act XVIII of 1994).
            </div>
            <div>
              By accessing this Site, you confirm your understanding of the
              Terms of Use. If you do not agree to these Terms, you shall not
              use this website. The Site reserves the right to change, modify,
              add, or remove portions of these Terms at any time. Changes will
              be effective when posted on the Site with no other notice
              provided. Please check these Terms of Use regularly for updates.
              Your continued use of the Site following the posting of changes to
              these Terms of Use constitutes your acceptance of those changes.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              User Account, Password, and Security
            </div>
            <div>
              You will receive a password and account designation upon
              completing the Website's registration process. You shall be
              responsible for maintaining the confidentiality of your account &
              its password as well as all the transactions/requests
              done/received under your password or account. You agree to (a)
              immediately notify UniCrescent.com of any unauthorized use of your
              password or account or any other breach of security, and (b)
              ensure that you exit from your account at the end of each session.
              UniCrescent.com shall not be liable for any loss or damage arising
              from your failure to comply with the T&C.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Services
            </div>
            <div>
              UniCrescent.com provides a number of Internet-based services
              through the Web Site (all such services, collectively, the
              "Service"). One such service enables users to purchase custom
              merchandise from UniCrescent and various sellers.(Collectively,
              "Products"). The Products can be purchased through the Website
              through various methods of payments offered. Upon placing an
              order, UniCrescent.com shall ship the product to you and you shall
              be responsible for its payment.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Privacy
            </div>
            <div>
              The User hereby consents, expresses and agrees that he has read
              and fully understands the Privacy Policy of UniCrescent.com. The
              user further consents that the terms and contents of such Privacy
              Policy are acceptable to him.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Limited User
            </div>
            <div>
              The User agrees and undertakes not to reverse engineer, modify,
              copy, distribute, transmit, display, perform, reproduce, publish,
              license, create derivative works from, transfer, or sell any
              information or software obtained from the Website. Limited
              reproduction and copying of the content of the Website is
              permitted provided that UniCrescent's name is stated as the source
              and prior written permission of UniCrescent.com is sought. For the
              removal of doubt, it is clarified that unlimited or wholesale
              reproduction, copying of the content for commercial or
              non-commercial purposes and unwarranted modification of data and
              information within the content of the Website is not permitted.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              User Conduct and Rules
            </div>
            <div>
              You agree and undertake to use the Website and the Service only to
              post and upload messages and material that are proper. By way of
              example, and not as a limitation, you agree and undertake that
              when using a Service, you will not:
              <ul className="policy-page-li">
                <li>
                  Defame, abuse, harass, stalk, threaten or otherwise violate
                  the legal rights of others
                </li>
                <li>
                  Publish, post, upload, distribute or disseminate any
                  inappropriate, profane, defamatory, infringing, obscene,
                  indecent or unlawful topic, name, material or information
                </li>
                <li>
                  PUpload files that contain software or other material
                  protected by intellectual property laws unless you own or
                  control the rights thereto or have received all necessary
                  consents; you own or control the rights thereto or have
                  received all necessary consents
                </li>
                <li>
                  Upload or distribute files that contain viruses, corrupted
                  files, or any other similar software or programs that may
                  damage the operation of the Website or another's computer
                </li>
                <li>
                  Conduct or forward surveys, contests, pyramid schemes or chain
                  letters
                </li>
                <li>
                  Download any file posted by another user of a Service that you
                  know, or reasonably should know, cannot be legally distributed
                  in such manner
                </li>
                <li>
                  Falsify or delete any author attributions, legal or other
                  proper notices or proprietary designations or labels of the
                  origin or source of software or other material contained in a
                  file that is uploaded
                </li>
                <li>
                  Violate any code of conduct or other guidelines, which may be
                  applicable for or to any particular Service
                </li>
                <li>
                  Violate any applicable laws or regulations for the time being
                  in force in or outside Bangladesh
                </li>
                <li>
                  Violate abuse, unethically manipulate or exploit any of the
                  terms and conditions of this Agreement or any other terms and
                  conditions for the use of the Website contained elsewhere.
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Discount Policy
            </div>
            <div>
              User can avail only one method of discount at a time (free
              delivery, coupon discount, payment gateway discount).
              <ul className="policy-page-li">
                <li>
                  if cart contains free delivery product then coupon discount
                  will only be applicable to non free delivery products.
                </li>
                <li>
                  if customer uses a payment gateway that offers discount, then
                  coupon discount will not be applicable.
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Product Description
            </div>
            <div>
              UniCrescent.com attempts to be as accurate as possible. However,
              UniCrescent.com does not warrant that product descriptions or
              other content of the site is accurate, complete, reliable,
              current, or error-free. If a product offered by UniCrescent.com
              itself is not as described, your sole remedy is to return it in
              unused condition.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Links to Third Party Site
            </div>
            <div>
              The Website may contain links to other websites ("Linked Sites").
              The Linked Sites are not under the control of UniCrescent.com or
              the Website and UniCrescent.com is not responsible for the
              contents of any Linked Site, including without limitation any link
              contained in a Linked Site, or any changes or updates to a Linked
              Site. UniCrescent.com is not responsible for any form of
              transmission, whatsoever, received by you from any Linked Site.
              UniCrescent.com is providing these links to you only as a
              convenience, and the inclusion of any link does not imply
              endorsement by UniCrescent.com or the Website of the Linked Sites
              or any association with its operators or owners including the
              legal heirs or assigns thereof. The users are requested to verify
              the accuracy of all information on their own before undertaking
              any reliance on such information.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Abusing UniCrescent.com
            </div>
            <div>
              As per these Terms, users are solely responsible for every
              material or content uploaded on to the Website. Users can be held
              legally liable for their contents and may be held legally
              accountable if their contents or material include, for example,
              defamatory comments or material protected by copyright, trademark,
              etc. Please report problems, offensive content and policy breaches
              to us. We work to ensure that listed items do not infringe upon
              the copyright, trademark or other intellectual property rights of
              third parties. If you believe that your intellectual property
              rights have been infringed, please notify our team and we will
              investigate.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Order Acceptance and Pricing
            </div>
            <div>
              Please note that there are cases when an order cannot be processed
              for various reasons. The Site reserves the right to refuse or
              cancel any order for any reason at any given time. You may be
              asked to provide additional verifications or information,
              including but not limited to phone number and address, before we
              accept the order. We are determined to provide the most accurate
              pricing information on the Site to our users; however, errors may
              still occur, such as cases when the price of an item is not
              displayed correctly on the website. As such, we reserve the right
              to refuse or cancel any order. In the event that an item is
              mispriced, we may, at our own discretion, either contact you for
              instructions or cancel your order and notify you of such
              cancellation. We shall have the right to refuse or cancel any such
              orders whether or not the order has been confirmed and your
              debit/credit card charged. All prices posted on this website are
              subject to change without notice. Prices prevailing at
              commencement of placing the order will apply. Posted prices do
              includes all taxes and charges. In case there are any additional
              charges or taxes the same will be mentioned on the website.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Trademarks and Copyrights
            </div>
            <div>
              Unless otherwise indicated or anything contained to the contrary
              or any proprietary material owned by a third party and so
              expressly mentioned, UniCrescent.com owns all Intellectual
              Property Rights to and into the Website, including, without
              limitation, any and all rights, title and interest in and to
              copyright, related rights, patents, utility models, trademarks,
              trade names, service marks, designs, know-how, trade secrets and
              inventions (whether patentable or not), goodwill, source code,
              meta tags, databases, text, content, graphics, icons, and
              hyperlinks. You acknowledge and agree that you shall not use,
              reproduce or distribute any content from the Website belonging to
              UniCrescent.com without obtaining authorization from
              UniCrescent.com.
            </div>
            <div className="mt-2">
              Notwithstanding the foregoing, it is expressly clarified that you
              will retain ownership and shall solely be responsible for any
              content that you provide or upload when using any Service,
              including any text, data, information, images, photographs, music,
              sound, video or any other material which you may upload, transmit
              or store when making use of our various Service. However, with
              regard to the product customization Service (as against other
              Services like blogs and forums) you expressly agree that by
              uploading and posting content on to the Website for public viewing
              and reproduction/use of your content by third party users, you
              accept the User whereby you grant a non-exclusive license for the
              use of the same.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Return & Replacement Policy
            </div>
            <div>
              It's a rare case for UniCrescent where customers didn't get their
              products unharmed. But sometimes we may fail to fulfill your
              expectations, sometimes situations aren't by our side. But there
              is now a bond of trust between customers and UniCrescent, So, for
              further ensuring and encouraging this bond of trust
              UniCrescent.com brings you option to return the products you got
              (If the product is damaged or designed mistakenly.). In that case
              UniCrescent will give you fresh products in return.
            </div>
            <div className="mt-2">
              If for any reason you are unsatisfied with your order, you may
              return it as long as your item meets the following criteria:
              <ul className="policy-page-li">
                <li>It is within 03 Days from the delivery date.</li>
                <li>
                  If the item came with a free promotional item, the free item
                  must also be returned.
                </li>
                <li>
                  Refund/ replacement for products are subject to inspection and
                  checking by UniCrescent team.
                </li>
                <li>
                  Replacement is subject to availability of stock with the
                  Supplier. If the product is out of stock, you will receive a
                  full refund, no questions asked.
                </li>
                <li>
                  Please note that the Cash on Delivery convenience charge and
                  the shipping charge would not be included in the refund value
                  of your order as these are non-refundable charges.
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold border-b-2 border-gray-500 pb-4 mb-2">
              Reasons for returns & replacement
            </div>
            <div className="">
              <ul className="policy-page-li">
                <li>Product is damaged, defective or not as described.</li>
                <li>Size Mismatch for clothing.</li>
                <li>Color Mismatch for clothing.</li>
                <li>Wrong product sent.</li>
              </ul>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2">How to return:</div>
            <div className="">
              Contact UniCrescent Customer Care team by emailing
              info@UniCrescent.com within 03 days after receiving your order.
            </div>
            <div className="mt-2">
              Once we pick up or receive your return, we will do a quality check
              of the product at our end and if the reason for return is valid,
              we will replace the product with a new one or we will proceed with
              the refund.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2">Refund Policy</div>
            <div className="">
              <ul className="policy-page-li">
                <li>
                  The refund will be processed after we have completed
                  evaluating your return.
                </li>
                <li>
                  Replacement is subject to availability of stock with the
                  Supplier. If the product is out of stock, you will receive a
                  full refund, no questions asked.
                </li>
                <li>
                  Please note that the Cash on Delivery convenience charge and
                  the shipping charge would not be included in the refund value
                  of your order as these are non-refundable charges.
                </li>
                <li>
                  If you have selected Cash on Delivery (COD), there is no
                  amount to refund because you haven't paid for your order.
                </li>
                <li>
                  For payments made using a Credit Card, Debit Card, Mobile
                  Banking or Bank Transfer, you will receive a refund in your
                  respective.
                </li>
                <li>
                  If online payment is made once more due to technical error,
                  payment refund will be made.
                </li>
                <li>
                  You will receive a refund anytime between 7-10 working days.
                  If you don't receive refund within this time, please write to
                  us at info@UniCrescent.com and we shall investigate.
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Order Cancellation
            </div>
            <div className="">
              <div className="">
                You will get a phone confirmation after you place an order. If
                you wish, you can cancel that order when you receive our
                confirmation call. You may not be able to cancel your order
                after you agree to receive product on our confirmation call.
              </div>
              <div className="mt-2">
                If you have selected Cash on Delivery (COD), there is no amount
                to refund because you haven't paid for your order.
              </div>
              <div className="mt-2">
                For payments made using a Credit Card, Debit Card, Mobile
                Banking or Bank Transfer, you will receive a refund in your
                respective account after your order has been cancelled. Your
                entire order amount will be refunded.
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Governing Law
            </div>
            <div className="">
              <div className="">
                These terms shall be governed by and constructed in accordance
                with the laws of Bangladesh without reference to conflict of
                laws principles and disputes arising in relation hereto shall be
                subject to the exclusive jurisdiction of the courts at Dhaka.
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Legal Disputes
            </div>
            <div className="">
              <div className="">
                If a dispute arises between you and UniCrescent.com, our goal is
                to provide you with a neutral and cost effective means of
                resolving the dispute quickly. Accordingly, you and
                'UniCrescent.com' agree that we will resolve any claim or
                controversy at law or equity that arises out of this Agreement
                or our services in accordance with one of the subsections below
                or as we and you otherwise agree in writing. Before resorting to
                these alternatives, we strongly encourage you to first contact
                us directly to seek a resolution. We will consider reasonable
                requests to resolve the dispute through alternative dispute
                resolution procedures, such as arbitration, as alternatives to
                litigation.
                <ul className="policy-page-li">
                  <li>
                    APPLICABLE LAW AND JURISDICTION: These Terms and Conditions
                    shall be interpreted and governed by the laws in force in
                    Bangladesh. Subject to the Arbitration section below, each
                    party hereby agrees to submit to the jurisdiction of the
                    courts of Dhaka.
                  </li>
                  <li>
                    ARBITRATION: Any controversy, claim or dispute arising out
                    of or relating to these Terms and Conditions will be
                    referred to and finally settled by private and confidential
                    binding arbitration before a single arbitrator held in
                    Dhaka, Bangladesh. The arbitrator shall be a person who is
                    legally trained and who has experience in the information
                    technology field in Dhaka and is independent of either
                    party. Notwithstanding the foregoing, the Site reserves the
                    right to pursue the protection of intellectual property
                    rights and confidential information through injunctive or
                    other equitable relief through the courts.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Unauthorized Charges on your card
            </div>
            <div className="">
              <div className="">
                If you see charges on your credit/debit card for purchases made
                on UniCrescent.com, but you never created an account or signed
                up, please check with your family members or business colleagues
                authorized to make purchases on your behalf, to confirm that
                they haven't placed the order. If you're still unable to
                recognize the charge, please report the unauthorized purchase
                within 60 days of the transaction to enable UniCrescent.com to
                begin an investigation.
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Cancellation of Fraudulent/Loss to business Orders
            </div>
            <div className="">
              <div className="">
                To provide a safe and secure shopping experience, we regularly
                monitor transactions for fraudulent activity. In the event of
                detecting any suspicious activity, UniCrescent.com reserves the
                right to cancel all past, pending and future orders without any
                liability. UniCrescent.com also reserves the right to refuse or
                cancel orders in scenarios like inaccuracies in pricing of
                product on website and stock unavailability. We may also require
                additional verifications or information before accepting any
                order. We will contact you if all or any portion of your order
                is cancelled or if additional information is required to accept
                your order. If your order is cancelled after your card has been
                charged, the said amount will be reversed to your Card Account.
                Any promotional voucher used for the cancelled orders may not be
                refunded.
              </div>
              <div>
                <div>
                  The customer may be considered fraudulent if any of the
                  following scenarios are met:
                </div>
                <ul className="policy-page-li">
                  <li>
                    Customer doesn't reply to the payment verification mail sent
                    by UniCrescent.com
                  </li>
                  <li>
                    Customer fails to produce adequate documents during the
                    payment details verification
                  </li>
                  <li>Misuse of another customer's phone/email</li>
                  <li>Customer uses invalid email and phone no.</li>
                  <li>Customer returns the wrong product</li>
                  <li>Customer refuses to pay for an order</li>
                  <li>
                    Customer is involved in the snatch and run for any order
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Indemnifications
            </div>
            <div className="">
              You agree to indemnify, defend and hold harmless UniCrescent.com
              from and against any and all losses, liabilities, claims, damages,
              costs and expenses (including legal fees and disbursements in
              connection therewith and interest chargeable thereon) asserted
              against or incurred by UniCrescent.com that arise out of, result
              from, or may be payable by virtue of, any breach or
              non-performance of any representation, warranty, covenant or
              agreement made or obligation to be performed by you pursuant to
              these Terms.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Disclaimer of Warranties/Limitation of Liability
            </div>
            <div className="">
              UniCrescent.com has endeavored to ensure that all the information
              on the Website is correct, but UniCrescent.com neither warrants
              nor makes any representations regarding the quality, accuracy or
              completeness of any data, information, product or Service. In no
              event shall UniCrescent.com be liable for any direct, indirect,
              punitive, incidental, special, consequential damages or any other
              damages resulting from: (a) the use or the inability to use the
              Services or Products; (b) unauthorized access to or alteration of
              the user's transmissions or data; (c) any other matter relating to
              the services; including, without limitation, damages for loss of
              use, data or profits, arising out of or in any way connected with
              the use or performance of the Website or Service. Neither shall
              UniCrescent.com be responsible for the delay or inability to use
              the Website or related services, the provision of or failure to
              provide Services, or for any information, software, products,
              services and related graphics obtained through the Website, or
              otherwise arising out of the use of the website, whether based on
              contract, tort, negligence, strict liability or otherwise.
              Further, UniCrescent.com shall not be held responsible for
              non-availability of the Website during periodic maintenance
              operations or any unplanned suspension of access to the website
              that may occur due to technical reasons or for any reason beyond
              UniCrescent's control. The user understands and agrees that any
              material and/or data downloaded or otherwise obtained through the
              Website is done entirely at their own discretion and risk and they
              will be solely responsible for any damage to their computer
              systems or loss of data that results from the download of such
              material and/or data.
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Payment & Shipping
            </div>
            <div className="">
              <div className="">
                UniCrescent.com offers Cash on Delivery (COD), Debit/Credit Card
                (VISA, Master Card, DBBL Nexus etc.), Mobile Banking (bKash,
                Rocket) as payment method.
              </div>
              <div>
                We will arrange for shipment of the products to you. Shipping
                schedules are estimates only and cannot be guaranteed. We are
                not liable for any delays in the shipments. Sometimes, delivery
                may take longer due to bad weather, political disruptions and
                other unforeseen circumstances. Title and risk of loss and
                damages pass on to you upon the products delivery to you.
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Risk of Loss
            </div>
            <div className="">
              <div className="">
                All items purchased from UniCrescent.com are made pursuant to a
                shipment contract. This means that the Risk of Loss shall remain
                with UniCrescent.com until the item is transferred to you. In
                the event that the items are damaged after receipt, the risk
                falls on the customer.
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Fraud Protection Policy
            </div>
            <div className="">
              <div className="">
                UniCrescent.com realizes the importance of a strong fraud
                detection and resolution capability. We and our online payments
                partners monitor transactions continuously for suspicious
                activity and flag potentially fraudulent transactions for manual
                verification by our team. In the rarest of rare cases, when our
                team is unable to rule out the possibility of fraud
                categorically, the transaction is kept on hold, and the customer
                is requested to provide identity documents. The ID documents
                help us ensure that the purchases were indeed made by a genuine
                card holder. We apologize for any inconvenience that may be
                caused to customers and request them to bear with us in the
                larger interest of ensuring a safe and secure environment for
                online transactions.
              </div>
              <div>
                <ul className="policy-page-li">
                  <li>
                    UniCrescent.com may suspend or terminate your use of the
                    Website or any Service if it believes, in its sole and
                    absolute discretion that you have breached, violated,
                    abused, or unethically manipulated or exploited any term of
                    these Terms or anyway otherwise acted unethically.
                  </li>
                  <li>
                    These Terms will survive indefinitely unless and until
                    UniCrescent.com chooses to terminate them.
                  </li>
                  <li>
                    If you or UniCrescent.com terminates your use of the Website
                    or any Service, UniCrescent.com may delete any content or
                    other materials relating to your use of the Service and
                    UniCrescent.com will have no liability to you or any third
                    party for doing so.
                  </li>
                  <li>
                    You shall be liable to pay for any Service or product that
                    you have already ordered till the time of Termination by
                    either party whatsoever. Further, you shall be entitled to
                    your royalty payments as per the User License Agreement that
                    has or is legally deemed accrued to you.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Termination
            </div>
            <div className="">
              <div>
                <ul className="policy-page-li">
                  <li>
                    UniCrescent.com may suspend or terminate your use of the
                    Website or any Service if it believes, in its sole and
                    absolute discretion that you have breached, violated,
                    abused, or unethically manipulated or exploited any term of
                    these Terms or anyway otherwise acted unethically.
                  </li>
                  <li>
                    These Terms will survive indefinitely unless and until
                    UniCrescent.com chooses to terminate them.
                  </li>
                  <li>
                    If you or UniCrescent.com terminates your use of the Website
                    or any Service, UniCrescent.com may delete any content or
                    other materials relating to your use of the Service and
                    UniCrescent.com will have no liability to you or any third
                    party for doing so.
                  </li>
                  <li>
                    You shall be liable to pay for any Service or product that
                    you have already ordered till the time of Termination by
                    either party whatsoever. Further, you shall be entitled to
                    your royalty payments as per the User License Agreement that
                    has or is legally deemed accrued to you.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="policy-page-text">
            <div className="font-bold pb-4 mb-2 border-b-2 border-gray-500">
              Term and Policy updates
            </div>
            <div className="">
              We reserve the right to change or update these terms and policies
              at any time by placing a prominent notice on our site. Such
              changes shall be effective immediately upon posting to this site.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermCondition;
