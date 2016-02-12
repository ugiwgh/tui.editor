/**
 * @fileoverview Implements HR wysiwyg command
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var CommandManager = require('../commandManager'),
    domUtils = require('../domUtils');

/**
 * HR
 * Add horizontal line markdown syntax to wysiwyg Editor
 * @exports HR
 * @augments Command
 * @augments WysiwygCommand
 */
var HR = CommandManager.command('wysiwyg', /** @lends HR */{
    name: 'HR',
    keyMap: ['CTRL+L', 'CTRL+L'],
    /**
     *  커맨드 핸들러
     *  @param {WysiwygEditor} wwe WYsiwygEditor instance
     */
    exec: function(wwe) {
        var sq = wwe.getEditor(),
            range = sq.getSelection(),
            currentNode, nextBlockNode;

        if (range.collapsed && !sq.hasFormat('TABLE') && !sq.hasFormat('PRE')) {
            currentNode = domUtils.getChildNodeByOffset(range.startContainer, range.startOffset);
            nextBlockNode = domUtils.getNextTopBlockNode(currentNode);

            if (!nextBlockNode) {
                nextBlockNode = sq.createDefaultBlock();
                wwe.get$Body().append(nextBlockNode);
            }

            sq.modifyBlocks(function(frag) {
                frag.appendChild(sq.createElement('HR'));
                return frag;
            });

            range.selectNodeContents(nextBlockNode);
            range.collapse(true);

            sq.setSelection(range);
        }

        sq.focus();
    }
});


module.exports = HR;