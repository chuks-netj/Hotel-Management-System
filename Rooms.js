// async function fetchUserName(userId) {
//   try {
//     const response = await fetch(
//       `https://localhost:7261/api/UserProfile/${userId}`
//     );
//     if (!response.ok) {
//       throw new Error("User not found");
//     }

//     const data = await response.json();
//     document.getElementById("userName").textContent = data.userName;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     document.getElementById("userName").textContent = "Guest";
//   }
// }

async function fetchAvailableRooms() {
  try {
    const response = await fetch("https://localhost:7261/api/Room/available");
    const rooms = await response.json();

    let roomsHtml = "";
    rooms.forEach((room) => {
      roomsHtml += `
        <div class="room">
            <h3>${room.roomType}</h3>
            <p>Available Spaces: <span id="spaces-${room.roomId}">${room.capacity}</span></p>
            <p>Price per night: $${room.price}</p>
            <button onclick="makeReservation(${room.roomId})">Make Reservation</button>
        </div>
      `;
    });
    document.getElementById("rooms").innerHTML = roomsHtml;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

// Function to handle the "Make Reservation" button click
function makeReservation(roomId) {
  window.location.href = `Reservation.html?roomId=${roomId}`;
}

// Change this to dynamically retrieve the user's ID (e.g., from localStorage, session, or a backend authentication system)
// const Id = 1;

// Fetch user data and rooms when the page loads
// fetchUserName(Id);
fetchAvailableRooms();
