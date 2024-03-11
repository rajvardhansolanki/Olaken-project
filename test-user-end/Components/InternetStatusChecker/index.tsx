import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Offline, Online, Detector } from "react-detect-offline";

const InternetStatusChecker = () => {
  return (
    <div>
      <Detector
        render={({ online }) => (
          <div className={online ? "normal" : "warning"}>
            {online ? (
              <Snackbar autoHideDuration={6000}>
                <Alert severity={"success"}>Internet connected!</Alert>
              </Snackbar>
            ) : (
              <Snackbar open={!online} autoHideDuration={null}>
                <Alert severity={"error"}>
                  No connection detected! Please check your WIFI or mobile data
                </Alert>
              </Snackbar>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default InternetStatusChecker;
