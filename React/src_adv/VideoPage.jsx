import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";

const VideoPage = () => {
    const history = createBrowserHistory();

    useEffect(() => {
        
        const videopage = () => { history.listen((action) => {
            if (action === "POP") {
                return window.close()
            }
        })}

        return videopage

    }, [history.action]);

}

export default VideoPage;