//import { Navigate, Outlet, useOutletContext, useParams } from "react-router";
import { CEvent } from "../../oldPages/App";

type NoteLayoutProps = {
  cEvents: CEvent[];
};

export function useEvent() {
  //return useOutletContext<CEvent>();
}

export default function CEventsWithTags({ cEvents }: NoteLayoutProps) {
  //const { id } = useParams();
  //const cEvent = cEvents.find(n => n.id === id);
  //if (cEvent == null) return <Navigate to="/" replace />;
  //return <Outlet context={cEvent}></Outlet>;
}
