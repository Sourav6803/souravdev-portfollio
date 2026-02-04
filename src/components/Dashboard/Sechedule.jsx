import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Client Meeting',
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 11, 0),
      client: 'Acme Corp',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Project Deadline',
      start: new Date(2023, 10, 18, 0, 0),
      end: new Date(2023, 10, 18, 23, 59),
      type: 'deadline',
    },
    {
      id: 3,
      title: 'Design Review',
      start: new Date(2023, 10, 20, 14, 0),
      end: new Date(2023, 10, 20, 15, 30),
      client: 'XYZ Design',
      type: 'review',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    type: 'meeting',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          title: newEvent.title,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end),
          type: newEvent.type,
        },
      ]);
      setNewEvent({ title: '', start: '', end: '', type: 'meeting' });
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    switch (event.type) {
      case 'meeting':
        backgroundColor = '#6366f1';
        break;
      case 'deadline':
        backgroundColor = '#ef4444';
        break;
      case 'review':
        backgroundColor = '#10b981';
        break;
      default:
        backgroundColor = '#3b82f6';
    }

    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
    };

    return {
      style,
    };
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Schedule
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
            <div className="h-[600px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Event Form */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">Add New Event</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Start</label>
                  <input
                    type="datetime-local"
                    name="start"
                    value={newEvent.start}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">End</label>
                  <input
                    type="datetime-local"
                    name="end"
                    value={newEvent.end}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                  <select
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="deadline">Deadline</option>
                    <option value="review">Review</option>
                  </select>
                </div>
                <button
                  onClick={handleAddEvent}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity font-medium"
                >
                  Add Event
                </button>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">Upcoming Events</h2>
              <div className="space-y-3">
                {events
                  .filter((event) => new Date(event.start) > new Date())
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .slice(0, 3)
                  .map((event) => (
                    <div key={event.id} className="p-3 bg-gray-800 rounded-lg border-l-4" style={{
                      borderLeftColor: 
                        event.type === 'meeting' ? '#6366f1' : 
                        event.type === 'deadline' ? '#ef4444' : '#10b981'
                    }}>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-400">
                        {moment(event.start).format('MMM D, h:mm A')} - {moment(event.end).format('h:mm A')}
                      </p>
                      {event.client && <p className="text-xs text-gray-500 mt-1">Client: {event.client}</p>}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;