import React from "react";
import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;
  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6 flex flex-col sm:flex-row shadow-lg transition-transform transform hover:scale-105">
      <div className="flex-shrink-0">
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={room.name || "Room Image"}
          className="w-full sm:w-48 sm:h-32 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 sm:ml-4 mt-4 sm:mt-0 space-y-2">
        <h4 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300">
          {room.name || "Room Name"}
        </h4>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Address:</span>{" "}
          {room.address}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Availability:</span>{" "}
          {room.availability}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">Price:</span> $
          {room.price_per_hour}/hour
        </p>
      </div>
      <div className="mt-4 sm:mt-0 flex justify-end h-[35px]">
        <Link
          href={`/rooms/${room.$id}`}
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold px-4 py-1 rounded-md shadow transition duration-300 hover:from-teal-600 hover:to-blue-600"
        >
          View Room
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
