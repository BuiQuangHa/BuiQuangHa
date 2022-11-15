import { css } from "@emotion/react";
import { Tabs } from "antd";

import { ContentPaid } from "./ContentPaid";
import { ContentUnpaid } from "./ContentUnpaid";

export const TabsVienPhi = () => {
  return (
    <Tabs type="card" css={cssTabs}>
      <Tabs.TabPane key="UNPAID" tab="Unpaid">
        <ContentUnpaid />
      </Tabs.TabPane>

      <Tabs.TabPane key="PAID" tab="Paid">
        <ContentPaid />
      </Tabs.TabPane>
    </Tabs>
  );
};

const cssTabs = css({
  ".ant-tabs-nav": { marginBottom: 0 },
  ".ant-tabs-content-holder": {
    height: "calc(100vh - 210px)",
    backgroundColor: "#fff",
    padding: 20,
    overflow: "auto",
  },
});
