import React from "react";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from "../components/BookedRoomCard";
const BookingsPage = async () => {
  const bookings = await getMyBookings();
  return (
    <>
      {bookings.length > 0 ? (
        bookings.map((booking) => <BookedRoomCard booking={booking} />)
      ) : (
        <p>No Booked Room found</p>
      )}
    </>
  );
};

export default BookingsPage;
