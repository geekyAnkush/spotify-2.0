import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import { Menu } from '@headlessui/react'
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "./RecentlyPlayed";

function Right({spotifyApi, chooseTrack}) {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);



    return (
        <section className="p-4 space-y-8 pr-8">
            <div className="flex space-x-2 items-center justify-between">
                {/* icons */}
                <div className="flex items-ceneter space-x-4 border-2 border-[#262626] rounded-full
                h-12 py-3 px-4">
                    <HiOutlineShieldCheck className="text-[#ccc] text-xl"/>
                    <MdOutlineSettings className="text-[#ccc] text-xl"/>
                    <BiBell className="text-[#ccc] text-xl"/>
                </div>
                {/* profile */}
                <div className="">
                <Dropdown />
                </div>
            </div>
            <div className="bg-[#0d0d0d] border-2 p-4 border-[#262626] rounded-xl space-y-4">
                    <div className="flex items-ceneter justify-between">
                        <h4 className="text-white font-semibold text-sm">
                            Recently Played
                        </h4>
                        <ViewGridIcon className="text-[#686868] h-6"/>
                    </div>

                    <div className="space-y-4 overflow-y-scroll overscroll-x-hidden h-[250px] md:h-[400px]
                    scrollbar-hide">
                        {recentlyPlayed.map((track,index)=>(
                            <RecentlyPlayed key={index} track={track} chooseTrack={chooseTrack} />
                        ))}
                    </div>
                    <button className="btn w-full">
                            View All
                    </button>
                </div>
            
        </section>
    )
}

export default Right