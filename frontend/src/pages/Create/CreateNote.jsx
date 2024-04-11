import { Accordion, AccordionItem, Divider } from '@nextui-org/react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import icons from '../../assets/icons';
import CodeEditor from '../../components/CodeEditor';
import CustomButton from '../../components/CustomButton/CustomButton';
import FoldersSelect from '../../components/FoldersSelect/FoldersSelect';
import TextEditor from '../../components/TextEditor/TextEditor';
import TextInput from '../../components/TextInput/TextInput';
import { textInputTypes } from '../../components/TextInput/constants';
import { H5 } from '../../components/Typography';
import EditorContext from '../../utils/EditorContext';
import { createNoteInitialValues, createNoteSchema } from './Create.constants';

const CreateNote = () => {
  const [selectedEntry, setSelectedEntry] = useState('')
  const { editor, setEditor } = useContext(EditorContext);
  const formik = useFormik({
    initialValues: createNoteInitialValues,
    validationSchema: createNoteSchema,
    onSubmit: values => {
      console.log(values)
    }
  })

  useEffect(() => {
    const onEditorChange = async () => {
      await formik.setFieldValue("code", editor.content)
    }
    onEditorChange()
  }, [editor.content])

  useEffect(() => {
    const onSelectedLineChange = async () => {
      await formik.setFieldValue(`entries[${selectedEntry.currentKey}].lineNumbers`, editor.selectedLines)
    }
    onSelectedLineChange()
  }, [editor.selectedLines])

  useEffect(() => {
    if (selectedEntry.size === 1) {
      setEditor({
        ...editor,
        selectableLines: true
      })
    } else {
      setEditor({
        ...editor,
        selectableLines: false
      })
    }
  }, [selectedEntry])

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full"
      >
        <TextInput
          id="title"
          name="title"
          type={textInputTypes.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <TextInput
          id="description"
          name="description"
          type={textInputTypes.description}
          className="line-clamp-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        <FoldersSelect
          id="folder"
          name="folder"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.selectFolder}
        />
        <Divider className="my-6" />
        <div className="flex flex-col laptop:flex-row items-start justify-center gap-10 px-2">
          <div className="w-full overflow-hidden basis-1/2">
            <CodeEditor
              highlightedLine={editor.selectedLines}
              editable={true}
              size='screen'
            />
          </div>
          <div className="w-full h-full basis-1/2 justify-between">
            <FieldArray
              name="entries"
              render={(arrayHelpers) => (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full flex items-center gap-4">
                    <H5>Entries</H5>
                    <CustomButton
                      type="button"
                      onPress={() => arrayHelpers.push({ lineNumbers: [], content: '' })}
                      className="min-w-fit px-3"
                    >
                      {icons.create}
                    </CustomButton>
                  </div>
                  <Divider />
                  <Accordion
                    selectedKeys={selectedEntry}
                    onSelectionChange={setSelectedEntry}
                    selectionMode='single'
                    variant="splitted"
                  >
                    {formik.values.entries.map((entry, index) => (
                      <AccordionItem
                        key={index}
                        aria-label={`Entry ${index + 1}`}
                        title={`Entry ${index + 1}`}
                        subtitle={`Selected lines: ${formik.values.entries[index].lineNumbers}`}
                        className="next-accordion-item transition hover:border-primary-light"
                        classNames={{
                          base: [
                            "group-[.is-splitted]:shadow-none",
                            "group-[.is-splitted]:bg-background",
                            "border-[.1px]",
                            "border-divider",
                            "transition"
                          ],
                        }}
                      >
                        <TextEditor
                          name={`entries[${index}].content`}
                          value={formik.values.entries[index].content}
                          onChange={value => formik.setFieldValue(`entries[${index}].content`, value)}
                        />
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex items-center justify-end">
          <CustomButton type="submit" className="border-primary-dark">
            Create Note
          </CustomButton>
        </div>
      </form>
    </FormikProvider>
  )
}

export default CreateNote;