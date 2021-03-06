import Delta from 'quill-delta';
import Editor from '../../../core/editor';

describe('Align', function() {
  it('add', function() {
    const editor = this.initialize(Editor, '<p>0123</p>');
    editor.formatText(4, 1, { align: 'center' });
    expect(editor.getDelta()).toEqual(
      new Delta().insert('0123').insert('\n', { align: 'center' }),
    );
    expect(editor.scroll.domNode).toEqualHTML(
      '<p class="ql-align-center">0123</p>',
    );
  });

  it('get', function() {
    const editor = this.initialize(
      Editor,
      '<p>align test</p><p class="ql-align-center">0123</p>',
    );
    console.log('get!!!!!!!!!!!!!!!!!!!!!');
    console.log(editor.getDelta().ops[0].insert);
    expect(editor.getDelta()).toEqual(
      new Delta()
        .insert('align test\n')
        .insert('0123')
        .insert('\n', { align: 'center' }),
    );
    expect(editor.scroll.domNode).toEqualHTML(
      '<p>align test</p><p  class="ql-align-center">0123</p>',
    );
  });

  it('remove', function() {
    const editor = this.initialize(
      Editor,
      '<p class="ql-align-center">0123</p>',
    );
    editor.formatText(4, 1, { align: false });
    expect(editor.getDelta()).toEqual(new Delta().insert('0123\n'));
    expect(editor.scroll.domNode).toEqualHTML('<p>0123</p>');
  });

  it('whitelist', function() {
    const editor = this.initialize(
      Editor,
      '<p class="ql-align-center">0123</p>',
    );
    const initial = editor.scroll.domNode.innerHTML;
    editor.formatText(4, 1, { align: 'middle' });
    expect(editor.getDelta()).toEqual(
      new Delta().insert('0123').insert('\n', { align: 'center' }),
    );
    expect(editor.scroll.domNode).toEqualHTML(initial);
  });

  it('invalid scope', function() {
    const editor = this.initialize(Editor, '<p>0123</p>');
    const initial = editor.scroll.domNode.innerHTML;
    editor.formatText(1, 2, { align: 'center' });
    expect(editor.getDelta()).toEqual(new Delta().insert('0123\n'));
    expect(editor.scroll.domNode).toEqualHTML(initial);
  });
});
