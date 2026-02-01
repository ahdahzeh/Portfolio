export default function WorkLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 border-2 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"
          aria-hidden
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading project…</p>
      </div>
    </div>
  );
}
