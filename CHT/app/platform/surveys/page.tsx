import Link from "next/link";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { surveys } from "@/lib/mock/surveys";

export default function SurveysPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Survey Catalogue</h2>
        <Link href="/platform/surveys/create">
          <Button>Create Survey</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <Card key={survey.id} className="p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900">{survey.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {survey.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-500">
              <span>{survey.questions} questions</span>
              <span>•</span>
              <span>~{survey.estimatedMinutes} min</span>
              {survey.reward && (
                <>
                  <span>•</span>
                  <span className="text-green-600 font-medium">{survey.reward}</span>
                </>
              )}
            </div>
            <Link href={`/platform/surveys/${survey.id}`} className="block mt-4">
              <Button variant="outline" size="sm">
                Start Survey
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
