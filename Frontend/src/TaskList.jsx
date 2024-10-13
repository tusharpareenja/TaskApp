import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskList({ tasks }) {
  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white border border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Task List</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks available</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-300">{task.details}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
