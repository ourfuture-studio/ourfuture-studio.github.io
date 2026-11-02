import {mountNormalization} from './visual-normalization.mjs?v=e20d5afc93f6';
import {mountJoins} from './visual-joins.mjs?v=75c57d5a3c99';
import {mountGroupPartition} from './visual-group-partition.mjs?v=a738c1822982';
import {mountWhereHaving} from './visual-where-having.mjs?v=9e552f58d0c8';

mountNormalization();
mountJoins();
mountGroupPartition();
mountWhereHaving();
