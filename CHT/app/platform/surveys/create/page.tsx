"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";

type QuestionType = "text" | "radio" | "checkbox" | "dropdown";

interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[];
}

export default function CreateSurveyPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", type: "text", label: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), type: "text", label: "" },
    ]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="max-w-3xl space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Create Survey</h2>

      <Card>
        <CardHeader>
          <h3 className="font-medium">Survey Details</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Survey Title"
            placeholder="Enter survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
              placeholder="Enter survey description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="font-medium">Questions</h3>
          <Button variant="secondary" size="sm" onClick={addQuestion}>
            Add Question
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-4 border border-[var(--border)] rounded-lg space-y-3"
            >
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border border-[var(--border)] rounded-lg text-sm"
                  value={q.type}
                  onChange={(e) =>
                    updateQuestion(q.id, {
                      type: e.target.value as QuestionType,
                      options: e.target.value !== "text" ? [""] : undefined,
                    })
                  }
                >
                  <option value="text">Text</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="dropdown">Dropdown</option>
                </select>
                <Input
                  placeholder="Question label"
                  value={q.label}
                  onChange={(e) => updateQuestion(q.id, { label: e.target.value })}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(q.id)}
                >
                  Remove
                </Button>
              </div>
              {(q.type === "radio" || q.type === "checkbox" || q.type === "dropdown") && (
                <div className="pl-4 space-y-2">
                  {(q.options || []).map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder={`Option ${i + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const opts = [...(q.options || [])];
                          opts[i] = e.target.value;
                          updateQuestion(q.id, { options: opts });
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const opts = (q.options || []).filter((_, j) => j !== i);
                          updateQuestion(q.id, { options: opts });
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateQuestion(q.id, {
                        options: [...(q.options || []), ""],
                      })
                    }
                  >
                    Add option
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-medium">Schedule & Targeting</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </label>
            <select className="w-full px-3 py-2 border border-[var(--border)] rounded-lg">
              <option>All HCPs</option>
              <option>Oncologists</option>
              <option>Primary Care</option>
              <option>Specialists</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>Save & Publish</Button>
        <Button variant="outline">Save Draft</Button>
      </div>
    </div>
  );
}
