// /editor/shows

import { getData } from "@/lib/getData";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import { ShowsList, CreateShow } from "@/components/forms/EditShows"

export default async function Shows() {
    // const data = await getData("shows")
    const data = await getRemoteOrLocalData("shows");

    const showsList = [...data?.content].reverse() || [];
    
    return (
        <div className="editor-inner">
            <CreateShow/>
        </div>
    )
  }