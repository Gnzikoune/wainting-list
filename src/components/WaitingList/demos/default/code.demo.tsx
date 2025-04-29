import { WaitingList } from "../../WaitingList";

/**
 * Démo principale du composant WaitingList.
 * Ce fichier montre comment utiliser le composant avec ses props.
 * Aucun contenu n'est hardcodé dans le composant lui-même.
 */
export default function WaitingListDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <WaitingList />
      </div>
    </div>
  );
}
