import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, details }),
    })
    const data = await res.json()
    addTask(data.task)
    setTitle("")
    setDetails("")
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white border border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 text-white border-gray-700 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium mb-1">
              Details
            </label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-gray-800 text-white border-gray-700 focus:border-blue-500"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
