import Link from "next/link";
import CancelBookingButton from "./CancelBookingButton";

const BookedRoomCard = ({ booking }) => {
  const { room_id: room } = booking;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get month
    const options = { month: "short" };
    const month = date.toLocaleString("en-US", options, { timeZone: "UTC" });

    // Get day
    const day = date.getUTCDate();

    // Format time in UTC 12-hour
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };

    const time = date.toLocaleString("en-US", timeOptions);

    // Final formatted string
    return `${month} ${day} at ${time}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex-grow">
        <h4 className="text-xl font-semibold text-gray-800">{room.name}</h4>
        <p className="text-sm text-gray-600">
          <strong>Check In:</strong> {formatDate(booking.check_in)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Check Out:</strong> {formatDate(booking.check_out)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-4 sm:mt-0">
        <Link
          href={`/rooms/${room.$id}`}
          className="flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-gradient-to-l transition duration-300"
        >
          View Room
        </Link>
        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
};

export default BookedRoomCard;
