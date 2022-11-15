import { paths } from "../constants";
import { QlyKhamBenh, QlyNguoiDung, QlyTiepDon, QlyVienPhi } from "./elements";

export const routes = [
  {
    path: paths.QLY_NGUOI_DUNG,
    element: QlyNguoiDung,
  },
  {
    path: paths.QLY_KHAM_BENH,
    element: QlyKhamBenh,
  },
  {
    path: paths.QLY_TIEP_DON,
    element: QlyTiepDon,
  },
  {
    path: paths.QLY_VIEN_PHI,
    element: QlyVienPhi,
  },
];
