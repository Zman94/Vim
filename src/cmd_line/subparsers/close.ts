import { ErrorCode, VimError } from '../../error';
import * as node from '../commands/close';
import { Scanner } from '../scanner';

export function parseCloseCommandArgs(args: string): node.CloseCommand {
  if (!args) {
    return new node.CloseCommand({});
  }
  const scannedArgs: node.ICloseCommandArguments = {};
  const scanner = new Scanner(args);
  const c = scanner.next();
  if (c === '!') {
    scannedArgs.bang = true;
    scanner.ignore();
  } else if (c !== ' ') {
    throw VimError.fromCode(ErrorCode.TrailingCharacters);
  }
  scanner.skipWhiteSpace();
  if (!scanner.isAtEof) {
    throw VimError.fromCode(ErrorCode.TrailingCharacters);
  }
  return new node.CloseCommand(scannedArgs);
}
