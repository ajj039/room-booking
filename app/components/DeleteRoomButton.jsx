"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";
import deleteRoom from "../actions/deleteRoom";
import { toast } from "react-toastify";

const DeleteRoomButton = ({ roomId }) => {
  const onDeleteRoom = async () => {
    if (roomId) {
      try {
        await deleteRoom();
        toast.success("Room deleted successfully");
      } catch (error) {
        toast.error("Failed to delete room");
      }
    }
  };
  return (
    <button
      onClick={onDeleteRoom}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className="inline mr-1" /> Delete
    </button>
  );
};

export default DeleteRoomButton;
