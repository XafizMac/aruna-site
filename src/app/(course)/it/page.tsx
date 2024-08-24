"use client";

import { Button } from "@geist-ui/core";
import axios from "axios";

export default function IT() {
  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://1b61-139-28-29-150.ngrok-free.app/api/bot', {
        chat_id: 1,
        text: "Hello, I need help with my IT skills.",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-12">
      <h2>IT courses</h2>
      <Button
        onClick={handleSubmit}
        type="secondary-light"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        By course
      </Button>
    </div>
  );
}
