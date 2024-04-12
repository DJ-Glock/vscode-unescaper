import * as vscode from 'vscode';

class Replacer {

    triggerReplacement() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const selection = editor.selection;

        let affectedTextRange: vscode.Range;
        let textReplacement: string;
        let setCursorToEnd: boolean = false;

        if (selection && !selection.isEmpty) {
            affectedTextRange = new vscode.Range(selection.start, selection.end);
            const documentText = document.getText(affectedTextRange);
            textReplacement = this.replaceChars(documentText);
        } else {
            const documentText = document.getText();
            textReplacement = this.replaceChars(documentText);

            var firstLine = document.lineAt(0);
            var lastLine = document.lineAt(document.lineCount - 1);
            affectedTextRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

            if (selection.end.isEqual(lastLine.range.end)) {
                setCursorToEnd = true;
            }
        }

        editor.edit(editBuilder => {
            editBuilder.replace(affectedTextRange, textReplacement);
        })
            .then(success => {
                if (success && setCursorToEnd) {
                    var postion = editor.selection.end;
                    editor.selection = new vscode.Selection(postion, postion);
                }
            });
    }

    replaceChars(inputString: string): string {
        return inputString.replaceAll("\\n", "\n" as string)
            .replaceAll("\\t", "\t" as string)
            .replaceAll(`\\"`, `"` as string)
    }
}

export default Replacer;