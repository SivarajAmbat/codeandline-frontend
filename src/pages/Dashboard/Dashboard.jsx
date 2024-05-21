import { Divider, Spacer } from "@nextui-org/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CardSection from "../../components/CardSection/CardSection"
import { cardSectionTypes } from "../../components/CardSection/constants"
import FolderOverview from "../../components/FolderOverview/FolderOverview"
import MenuList from "../../components/MenuList/MenuList"
import NoteOverview from "../../components/NoteOverview/NoteOverview"
import { getUserFolders } from "../../reducers/foldersReducer"
import { getUserNotes } from "../../reducers/notesReducer"

const Dashboard = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname.split('/')[1]
  const notes = useSelector((state) => state.notes)
  const folders = useSelector((state) => state.folders)

  useEffect(() => {
    dispatch(getUserNotes())
    dispatch(getUserFolders())
  }, [])

  return (
    <div className="w-full laptop:px-20 flex flex-col tablet:flex-row justify-start items-start gap-4">
      <MenuList />
      {notes.length === 0 && folders.length === 0 ? null : (
        <Spacer
          className="tablet:w-[300px] tablet:min-w-[300px]"
        />
      )}
      <div className="w-full overflow-hidden flex flex-col gap-10">
        {path === 'folder-overview' ? (
            <FolderOverview />
        ) : path === 'note-overview' ? (
          <NoteOverview />
          ) : (
            <>
              <CardSection type={cardSectionTypes.NOTES} />
              <Divider />
              <CardSection type={cardSectionTypes.FOLDERS} noTitle={true} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard