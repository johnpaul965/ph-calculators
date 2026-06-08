import { Layout } from "@/components/layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <p>
            At PH Calculators, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PH Calculators and how we use it.
          </p>

          <h2>Information We Do Not Collect</h2>
          <p>
            Our calculators operate entirely on the client side (in your web browser). <strong>We do not save, store, transmit, or harvest any of the financial data, salary amounts, or personal numbers you input into our calculators.</strong> Once you close the tab or refresh the page, your input data is gone.
          </p>

          <h2>Information We Do Collect</h2>
          <h3>Log Files</h3>
          <p>
            PH Calculators follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h3>Cookies and Web Beacons</h3>
          <p>
            Like any other website, PH Calculators uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2>Google AdSense and DoubleClick DART Cookie</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
          </p>
          <ul>
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
          </ul>

          <h2>Google Analytics</h2>
          <p>
            We use Google Analytics to monitor and analyze web traffic. Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
          </p>

          <h2>Third Party Privacy Policies</h2>
          <p>
            PH Calculators's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2>Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
