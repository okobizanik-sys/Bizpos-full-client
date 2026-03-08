// import NavBar from "@/components/pages/header/NavBar/NavBar";
// import { getUser } from "@/services/auth";
// import { getCartProducts } from "@/services/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unicrescent | Privacy policy",
  description: "Best E-commerce platform in BD",
};

const PrivacyPolicy = async () => {
  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="Container py-10">
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="text-2xl lg:text-4xl font-semibold text-[#262626] text-center mt-14 lg:mt-0">
            Privacy Policies
          </div>

          <div className="policy-page-text ">
            UniCrescent respects and protects the privacy of our customers and
            users who visit our websites. UniCrescent knows that you care how
            information about you is used and shared, and we appreciate your
            trust that we will do so carefully and sensibly.
          </div>

          <div className="policy-page-text ">
            You are advised to read the Privacy Policy carefully. By accessing
            the services provided by UniCrescent.com you agree to the collection
            and use of your data by UniCrescent.com in the manner provided in
            this Privacy Policy.
          </div>

          <div className="policy-page-text font-semibold">
            What information is, or may be, collected from you?
          </div>

          <div className="policy-page-text ">
            We will automatically receive and collect certain anonymous
            information in standard usage logs through our Web server, including
            computer-identification information obtained from "cookies," sent to
            your browser from a web server cookie stored on your hard drive an
            IP address, assigned to the computer which you use the domain server
            through which you access our service the type of computer you're
            using the type of web browser you're using.
          </div>

          <div className="policy-page-text ">
            We may collect the following personally identifiable information
            about you -
            <ul className="policy-page-li">
              <li>Name including first and last name.</li>
              <li>Alternate email address.</li>
              <li>Mobile phone number and contact details.</li>
              <li>ZIP/Postal code.</li>
              <li>
                Financial information (like account or credit card numbers) -
                Opinions of features on our websites.
              </li>
              <li>Other information as per our registration process.</li>
            </ul>
          </div>

          <div className="policy-page-text ">
            We may also collect the following information -
            <ul className="policy-page-li">
              <li>About the pages you visit/access.</li>
              <li>The links you click on our site.</li>
              <li>The number of times you access the page.</li>
              <li>ZIP/Postal code.</li>
              <li>The number of times you have shopped on our web site.</li>
            </ul>
          </div>

          <div className="policy-page-text">
            You can terminate your account at any time. However, your
            information may remain stored in archive on our servers even after
            the deletion or the termination of your account.
          </div>

          <div className="policy-page-text font-semibold">
            Who collects the information?
          </div>

          <div className="policy-page-text">
            We will collect anonymous traffic information from you when you
            visit our site. We will collect personally identifiable information
            about you only as part of a voluntary registration process, on-line
            survey, or contest or any combination there of. Our advertisers may
            collect anonymous traffic information from their own assigned
            cookies to your browser. The Site contains links to other Web sites.
            We are not responsible for the privacy practices of such Web sites
            which we do not own, manage or control.
          </div>

          <div className="policy-page-text font-semibold">
            Usage of Information
          </div>

          <div className="policy-page-text">
            <div>We use your personal information to:</div>
            <ul className="policy-page-li">
              <li>
                Make our bond more stronger by knowing your interests and
                tailoring our site
              </li>
              <li>Get in touch with you when necessary</li>
              <li>Provide the services requested by you</li>
              <li>
                Preserve social history as governed by existing law or policy
              </li>
            </ul>
          </div>

          <div className="policy-page-text">
            <div>We use contact information internally to:</div>
            <ul className="policy-page-li">
              <li>Direct our efforts for product improvement</li>
              <li>Contact you as a survey respondent</li>
              <li>Notify you if you win any contest; and</li>
              <li>
                Send you promotional materials from our contest sponsors or
                advertisers
              </li>
            </ul>
          </div>

          <div className="policy-page-text">
            <div>Generally, we use anonymous traffic information to:</div>
            <ul className="policy-page-li">
              <li>Recognize your access privileges to our websites</li>
              <li>
                Track your entries in some of our promotions, sweepstakes and
                contests to indicate a player's progress through the promotion
                and to track entries, submissions, and status in prize drawings
              </li>
              <li>Make sure that you don't see the same ad repeatedly</li>
              <li>Help diagnose problems with our server</li>
              <li>
                Administer our websites, track your session so that we can
                understand better how people use our sites
              </li>
            </ul>
          </div>

          <div className="">
            <div className="policy-page-text font-bold">
              Sharing Information to Third Party
            </div>
            <div className="policy-page-text">
              We will not use your financial information for any purpose other
              than to complete a transaction with you. We do not rent, sell or
              share your personal information and we will not disclose any of
              your personally identifiable information to third parties unless:
            </div>
            <ul className="policy-page-text policy-page-li">
              <li>we have your permission</li>
              <li>to provide products or services you've requested</li>
              <li>
                to help investigate, prevent or take action regarding unlawful
                and illegal activities, suspected fraud, potential threat to the
                safety or security of any person, violations of
                UniCrescent.com's terms of use or to defend against legal claims
              </li>
              <li>
                Special circumstances such as compliance with subpoenas, court
                orders, requests/order, notices from legal authorities or law
                enforcement agencies requiring such disclosure.
              </li>
              <li>
                We share your information with advertisers on an aggregate basis
                only.
              </li>
            </ul>
          </div>

          <div>
            <div className="policy-page-text font-bold">
              Available Choices Regarding Information Collection and
              Re-distribution
            </div>
            <div className="policy-page-text">
              You may change your interests at any time and may opt-in or
              opt-out of any marketing / promotional / newsletters mailings.
              UniCrescent.com reserves the right to send you certain service
              related communication, considered to be a part of your
              UniCrescent.com account without offering you the facility to
              opt-out. You may update your information and change your account
              settings at any time.
            </div>
            <div className="policy-page-text">
              Upon request, we will remove/block your personally identifiable
              information from our database, thereby canceling your
              registration. However, your information may remain stored in
              archive on our servers even after the deletion or the termination
              of your account. If we plan to use your personally identifiable
              information for any commercial purposes, we will notify you at the
              time we collect that information and allow you to opt-out of
              having your information used for those purposes.
            </div>
          </div>

          <div className="policy-page-text font-bold">
            Security Procedures to Protect Information
          </div>
          <div className="policy-page-text">
            To protect against the loss, misuse and alteration of the
            information under our control, we have in place appropriate
            physical, electronic and managerial procedures. For example, our
            servers are accessible only to authorized personnel and that your
            information is shared with respective personnel on need to know
            basis to complete the transaction and to provide the services
            requested by you.
          </div>

          <div className="policy-page-text font-bold">Your rights</div>

          <div className="policy-page-text">
            If you are concerned about your data you have the right to request
            access to the personal data which we may hold or process about you.
            You have the right to require us to correct any inaccuracies in your
            data free of charge. At any stage, you also have the right to ask us
            to stop using your personal data for direct marketing purposes. If
            you at any stage want to delete your personal data from UniCrescent,
            across all platforms, you have the full right to do so. Please send
            an email to support@unicrescent.com, we will process your request
            within the next business day and will notify you about the update.
          </div>

          <div>
            <div className="policy-page-text font-bold">Policy updates</div>
            <div className="policy-page-text">
              We reserve the right to change or update this policy at any time
              by placing a prominent notice on our site. Such changes shall be
              effective immediately upon posting to this site.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
