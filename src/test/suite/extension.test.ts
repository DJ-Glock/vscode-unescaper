import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {

	test('Smoke test', async () => {
		let editor = vscode.window.activeTextEditor

		if (editor) {
			let testText = `javax.servlet.ServletException: Something bad happened\\n\\tat org.mortbay.thread.QueuedThreadPool$PoolThread.run(QueuedThreadPool.java:582)\\n\\tCaused by: com.example.myproject.MyProjectServletException \\"Some cause with \\'quotes\\'\\", slash \\ and \\rcarriage return`
			let expected = `javax.servlet.ServletException: Something bad happened\r\n\tat org.mortbay.thread.QueuedThreadPool$PoolThread.run(QueuedThreadPool.java:582)\r\n\tCaused by: com.example.myproject.MyProjectServletException "Some cause with 'quotes'", slash \\ and \r\ncarriage return`

			await editor.edit(editBuilder => {
				editBuilder.replace(editor!.selection.active, testText)
			}).then((res) => {
				assert.strictEqual(res, true)
			})

			await vscode.commands.executeCommand("unescapeCharacters.replace")

			const actual = editor.document.getText()
			assert.strictEqual(actual, expected, "Text should match")
		} else throw new Error("Editor is undefined")
	});
});
