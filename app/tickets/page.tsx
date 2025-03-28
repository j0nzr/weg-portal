"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Ticket {
  id: number;
  subject: string;
  message: string;
  datec: string;
  status: number;
}

const getStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return "Open";
    case 1:
      return "In Progress";
    case 2:
      return "Closed";
    default:
      return "Unknown";
  }
};

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    localStorage.setItem("dolibarr_token", "UQ3kqPC5Hdzz5S9u8oe4UD7e7Qg5QHl8");
    const authToken = localStorage.getItem("dolibarr_token");
    if (!authToken) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://172.105.91.210/api/index.php/tickets", {
        headers: {
          "Content-Type": "application/json",
          "DOLAPIKEY": authToken,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tickets");
      
      const data: Ticket[] = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async () => {
    localStorage.setItem("dolibarr_token", "UQ3kqPC5Hdzz5S9u8oe4UD7e7Qg5QHl8");
    const authToken = localStorage.getItem("dolibarr_token");
    if (!authToken) {
      alert("Authentication required");
      return;
    }

    try {
      const res = await fetch("http://172.105.91.210/api/index.php/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "DOLAPIKEY": authToken,
        },
        body: JSON.stringify({
          subject: newTicket.subject,
          message: newTicket.message,
          status: 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to create ticket");
      
      setNewTicket({ subject: "", message: "" });
      fetchTickets();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
      <div className="max-w-3xl w-full mx-auto py-12 px-6 bg-gray-100 min-h-screen relative">
      <button 
        className="absolute top-4 left-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        onClick={() => router.back()}
      >
        Zurück
      </button>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Tickets</h1>

      {/* New Ticket Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create a New Ticket</h2>
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
          value={newTicket.subject}
          onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={newTicket.message}
          onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={createTicket}
        >
          Submit Ticket
        </button>
      </div>

      {/* Ticket List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <li key={ticket.id} className="p-5 bg-white shadow-md rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-800">{ticket.subject}</h3>
                <p className="text-gray-600 mt-1">{ticket.message}</p>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${
                  ticket.status === 0 ? "bg-yellow-200 text-yellow-800" :
                  ticket.status === 1 ? "bg-blue-200 text-blue-800" :
                  "bg-green-200 text-green-800"
                }`}>
                  {getStatusLabel(ticket.status)}
                </span>
                <small className="text-gray-400 mt-2 block">Created: {new Date(ticket.datec).toLocaleString()}</small>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No tickets found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
