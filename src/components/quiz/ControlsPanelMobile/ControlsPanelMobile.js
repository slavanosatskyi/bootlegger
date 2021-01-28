import React from "react";

import ControlsPanel from "../ControlsPanel/ControlsPanel";

import "./ControlsPanelMobile.scss";

const ControlsPanelMobile = ({children}) => {
    return (
        <div className="controls-panel_mobile">
            <ControlsPanel>
                {children}
            </ControlsPanel>
        </div>
    )
}

export default ControlsPanelMobile;