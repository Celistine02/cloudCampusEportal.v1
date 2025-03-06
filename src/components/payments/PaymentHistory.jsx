import PaymentDetails from "./PaymentDetails";
import PaymentTable from "./PaymentTable";
import { useMediaQuery } from "@mui/material";

const PaymentHistoryMainArea = () => {
  const isSmallScreen = useMediaQuery("(max-width: 480px)"); // For small screens like older iPhones
  const isMediumScreen = useMediaQuery("(max-width: 768px)"); // For medium screens like newer iPhones and smaller Android devices
  const isLargeScreen = useMediaQuery("(max-width: 1024px)"); // For larger screens like tablets and larger Android devices

  return (
    <div className={`p-4 bg-white text-black ${isSmallScreen || isMediumScreen ? "text-center" : ""}`}>
      <div className="relative z-0">
        <h3 className="text-center font-bold text-3xl pt-2">Payment History</h3>
      </div>
      <div className={`${isSmallScreen ? "space-y-2" : isMediumScreen ? "space-y-4" : "space-y-8"} relative z-0`}>
        <PaymentDetails />
        <PaymentTable />
      </div>
    </div>
  );
};

export default PaymentHistoryMainArea;
