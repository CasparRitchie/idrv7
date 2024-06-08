import React, { useState } from 'react';
import Stand from './Stand';

function Auditapp() {
  const [audit, setAudit] = useState({
    id: 'audit-123',
    date: '2024-06-05',
    restaurantName: 'Le Bon Repas',
    manager: 'Jean Dupont',
    contactFirstName: 'Marie',
    contactLastName: 'Curie',
    contactFunction: 'Chef de cuisine',
    averageMeals: 200,
    seatingCapacity: 100,
    mealsServedToday: 150,
    selfServiceStart: '11:30',
    selfServiceEnd: '14:00',
    previousAuditDates: ['2023-06-04'],
    stands: []
  });

  const addStand = () => {
    setAudit({
      ...audit,
      stands: [
        ...audit.stands,
        { name: '', chapters: [] }
      ]
    });
  };

  const updateStand = (index, stand) => {
    const newStands = audit.stands.map((s, i) => (i === index ? stand : s));
    setAudit({ ...audit, stands: newStands });
  };

  const removeStand = (index) => {
    const newStands = audit.stands.filter((_, i) => i !== index);
    setAudit({ ...audit, stands: newStands });
  };

  return (
    <div>
      <h1>Audit Information</h1>
      {/* Basic audit information form */}
      <button onClick={addStand}>Add Stand</button>
      {audit.stands.map((stand, index) => (
        <Stand
          key={index}
          stand={stand}
          index={index}
          updateStand={updateStand}
          removeStand={removeStand}
        />
      ))}
      <button onClick={() => console.log(audit)}>Submit</button>
    </div>
  );
}

export default Auditapp;
