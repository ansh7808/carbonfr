import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Alag-alag form
const CarbonForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label htmlFor="transport" className="block text-sm font-medium text-gray-700">Mode of Transport</label>
      <select id="transport" name="transport" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
        <option>Car</option>
        <option>Bus</option>
        <option>Bike</option>
      </select>
    </div>
    <div>
      <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance (in km)</label>
      <input type="number" id="distance" name="distance" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
    </div>
    <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">Save Data</button>
  </form>
);

const WaterForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label htmlFor="shower" className="block text-sm font-medium text-gray-700">Shower Time (in mins)</label>
      <input type="number" id="shower" name="shower" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
    </div>
    <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">Save Data</button>
  </form>
);

// Yeh component chunaav karega ki kaunsa form dikhana hai
const ActivityForm = ({ type, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Data Backend pe jaayega:", { type, ...data }); // Asli POST request yahaan lagegi
    onClose(); // Form submit karke modal band karo
  };

  switch (type) {
    case 'carbon':
      return <CarbonForm onSubmit={handleSubmit} />;
    case 'water':
      return <WaterForm onSubmit={handleSubmit} />;
    case 'health':
      return <p>Health Form Yahaan Aayega</p>; // Placeholder
    case 'finance':
      return <p>Finance Form Yahaan Aayega</p>; // Placeholder
    default:
      return null;
  }
};

// Asli Modal Component (Headless UI)
const LogActivityModal = ({ isOpen, onClose, activityType }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 capitalize mb-4"
                >
                  Log {activityType} Activity
                </Dialog.Title>
                
                {/* Yahaan aapka dynamic form render hoga */}
                <ActivityForm type={activityType} onClose={onClose} />

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LogActivityModal;