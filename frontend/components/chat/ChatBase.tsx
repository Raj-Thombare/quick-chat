"use client";

import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";

type Message = {
  name: string;
  id: string;
};

const ChatBase = ({ groupId }: { groupId: string }) => {
  const socket = useMemo(() => {
    const socket = getSocket();

    socket.auth = {
      room: groupId,
    };

    return socket.connect();
  }, [groupId]);

  useEffect(() => {
    console.log("connecting to socket client....");
    socket.on("message", (data: Message) => {
      console.log("The socket message on client:  ", data);
    });

    return () => {
      console.log("disconnecting... socket client");

      socket.close();
    };
  }, [socket]);

  const handleClick = () => {
    socket.emit("message", {
      name: "Raj",
      id: uuidV4(),
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
};

export default ChatBase;
