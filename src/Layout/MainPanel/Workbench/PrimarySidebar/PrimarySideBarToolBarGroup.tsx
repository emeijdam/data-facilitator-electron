
import { makeStyles, ToolbarButton, ToolbarGroup, } from "@fluentui/react-components";
import React, { Fragment } from 'react';
import { MoreHorizontal24Filled, } from "@fluentui/react-icons";

const useStyles = makeStyles({
  tg: {
    columnGap: '0px'
  }
});

interface Props {
  title: string,
}

const PrimarySideBarToolBarGroup = ({ title }: Props) => {
  const PrimarySideBarToolBarGroupStyles = useStyles();
  
  return (
    <Fragment>
      <ToolbarGroup role="presentation" className={PrimarySideBarToolBarGroupStyles.tg}>
        {title}
      </ToolbarGroup>
      <ToolbarGroup role="presentation" className={PrimarySideBarToolBarGroupStyles.tg}>
        <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
      </ToolbarGroup>
    </Fragment>
  )
};

export default PrimarySideBarToolBarGroup;