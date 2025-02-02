"use client";
import { useEffect } from "react";
import { showToast } from "../Notification/Toast";
import { connections } from "@/config/config";

export default function WebSocketListener() {
  useEffect(() => {
    const socket = new WebSocket(`ws://${connections.origin}:4000`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const prices_change = JSON.parse(data.message);
      if (data.type === "notify") {
        if (prices_change.purchase_percentageChange > 0)
          showToast.success({
            message: `Increase in ${
              prices_change.currency_name
            } purchase price by ${
              prices_change.purchase_percentageChange
            }% at ${new Date(data.timestamp).toLocaleTimeString()}`,
            duration: 15000,
          });
        else {
          showToast.error({
            message: `Decrease in ${
              prices_change.currency_name
            } purchase price by ${
              prices_change.purchase_percentageChange
            }% at ${new Date(data.timestamp).toLocaleTimeString()}`,
            duration: 15000,
          });
        }
        if (prices_change.sale_percentageChange > 0)
          showToast.success({
            message: `Increase in ${
              prices_change.currency_name
            } sales price by ${
              prices_change.sale_percentageChange
            }% at ${new Date(data.timestamp).toLocaleTimeString()}`,
            duration: 15000,
          });
        else {
          showToast.error({
            message: `Decrease in ${
              prices_change.currency_name
            } sales price by ${
              prices_change.sale_percentageChange
            }% at ${new Date(data.timestamp).toLocaleTimeString()}`,
            duration: 15000,
          });
        }
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return null;
}
