import { expectType } from 'tsd';
import jsxToObj, { EasyJsxNode } from '.';

expectType<EasyJsxNode[]>(jsxToObj('foo bar'));
