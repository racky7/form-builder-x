import Navbar from "./components/navbar";
import { FormBuilderContextProvider } from "./context";
import EditorArea from "./components/editor-area";
import ElementsPane from "./components/elements-pane";
import FieldEditorPane from "./components/field-editor-pane";

export default function FormBuilder() {
  return (
    <FormBuilderContextProvider>
      <div className="w-full h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex overflow-y-auto">
          <ElementsPane />
          <div className="flex-1 flex overflow-y-auto">
            <div className="flex-1 flex justify-center bg-primary/10 overflow-y-auto">
              <EditorArea className="max-w-[660px] h-full" />
            </div>
          </div>
          <FieldEditorPane />
        </div>
      </div>
    </FormBuilderContextProvider>
  );
}
