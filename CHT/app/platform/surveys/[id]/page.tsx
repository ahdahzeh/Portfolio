import { notFound } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { surveys } from "@/lib/mock/surveys";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SurveyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const survey = surveys.find((s) => s.id === id);
  if (!survey) notFound();

  return (
    <div className="max-w-2xl">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">{survey.title}</h2>
        <p className="text-gray-600 mt-2">{survey.description}</p>
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
          <span>{survey.questions} questions</span>
          <span>~{survey.estimatedMinutes} min</span>
          {survey.reward && (
            <span className="text-green-600 font-medium">{survey.reward} reward</span>
          )}
        </div>
        <div className="mt-6 flex gap-4">
          <Button>Start Survey</Button>
          <Link href="/platform/surveys">
            <Button variant="outline">Back to Surveys</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
