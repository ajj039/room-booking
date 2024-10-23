import Link from "next/link";
import React from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import DeleteRoomButton from "./DeleteRoomButton";

const MyRoomCard = ({ room }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4 flex flex-col sm:flex-row justify-between items-start">
      <div className="flex flex-col">
        <h4 className="text-xl font-bold text-gray-800">
          {room?.name ? room.name : "NA"}
        </h4>
        <p className="text-sm text-gray-500">
          {room?.description ? room.description : "No description available."}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-4 sm:mt-0">
        <Link
          href={`/rooms/${room.$id}`}
          className="flex items-center bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-gradient-to-l transition duration-300"
        >
          <FaEye className="inline mr-1" /> View
        </Link>

        <Link
          href={`/rooms/edit/${room.$id}`}
          className="flex items-center bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-gradient-to-l transition duration-300"
        >
          <FaEdit className="inline mr-1" /> Edit
        </Link>
        <DeleteRoomButton roomId={room.$id} />
      </div>
    </div>
  );
};

export default MyRoomCard;
