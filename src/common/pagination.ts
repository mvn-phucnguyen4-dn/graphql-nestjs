import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Expose } from 'class-transformer';

@ObjectType()
export class PaginationObject {
  @Field(() => Int, { nullable: true })
  readonly page!: number;

  @Field(() => Int)
  readonly pageSize!: number;

  @Field(() => Int, { nullable: true })
  readonly nextPage?: number | null;

  @Field(() => Int)
  readonly itemsCount?: number;

  @Field(() => Int)
  readonly total!: number;
}

// 0000-0000
interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  totalCount: number;
  hasNextPage: boolean;
  endCursor: string;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  console.log(classRef);
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((type) => String)
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Expose()
    @Field((type) => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Expose()
    @Field((type) => Int)
    totalCount: number;

    @Expose()
    @Field()
    hasNextPage: boolean;

    @Expose()
    @Field()
    endCursor: string;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
