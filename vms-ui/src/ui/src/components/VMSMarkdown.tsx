import { FC, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import MarkdownIt from "markdown-it";
import MdEditor, { Plugins } from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SimpleButton from "./SimpleButton";

const EditorWrapper = styled("div")(({ theme }) => ({}));

const useStyles = makeStyles({
  editor: {
    fontFamily: "sans-serif",
    height: "auto",
    minHeight: "150px",
    display: "flex",
    flexGrow: 1,
    maxWidth: "inherit",
    boxSizing: "border-box",
    overflowWrap: "break-word",
  },
  readonly: {
    margin: "0px -15px 0px",
    padding: 0,
    fontFamily: "sans-serif",
    fontSize: "1rem",
    display: "flex",
    flexGrow: 1,
    border: "0px !important",
    borderRadius: "10px",
    overflowWrap: "break-word",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--ds-background-neutral-subtle-hovered,#EBECF0)",
    },
  },
});

export const MarkdownText: FC<{
  value: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  [props: string]: any;
}> = ({ value, onClick, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const mdParser = new MarkdownIt();

  return (
    <EditorWrapper onClick={onClick}>
      <MdEditor
        value={value || t("Type here...")}
        className={classes.readonly}
        renderHTML={(text: string) => mdParser.render(text)}
        readOnly
        config={{
          view: {
            menu: false,
            md: false,
            html: true,
            fullScreen: false,
            hideMenu: false,
          },
        }}
        {...props}
      />
    </EditorWrapper>
  );
};

export const MarkdownEditor: FC<{
  value: string;
  onChange: Function;
  onSave: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  [props: string]: any;
}> = ({ value, onChange, onSave, onCancel, ...props }) => {
  const { t } = useTranslation();
  const handleImageUpload = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data?.target?.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const classes = useStyles();
  const mdParser = new MarkdownIt();
  const handleEditorChange = ({ text }: { text: string }) => onChange(text);
  MdEditor.unuse(Plugins.FontUnderline);
  MdEditor.unuse(Plugins.FullScreen);
  return (
    <>
      <EditorWrapper>
        <MdEditor
          value={value}
          className={classes.editor}
          renderHTML={(text: string) => mdParser.render(text)}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
            },
          }}
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
          {...props}
        />
        <SimpleButton
          sx={{ mt: 1, mb: 1 }}
          variant="contained"
          color="primary"
          size="small"
          onClick={onSave}
        >
          {t("save")}
        </SimpleButton>
        <SimpleButton
          sx={{ mt: 1, mb: 1, ml: 1 }}
          variant="text"
          color="inherit"
          size="small"
          onClick={onCancel}
        >
          {t("cancel")}
        </SimpleButton>
      </EditorWrapper>
    </>
  );
};
