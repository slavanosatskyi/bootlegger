import React from "react";

import ControlsPanel from "../ControlsPanel/ControlsPanel";

import "./ControlsPanelDesktop.scss";

const ControlsPanelDesktop = ({children}) => {
    return (
        <div className="controls-panel_desktop">
            <ControlsPanel>
                {children}
            </ControlsPanel>
        </div>
    )
}

export default ControlsPanelDesktop;