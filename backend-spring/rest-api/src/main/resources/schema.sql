create table if not exists chat_room(
    id bigint auto_increment primary key,
    category_id bigint,
    subject varchar(255),
    capacity integer,
    created_date timestamp default current_timestamp,
    created_by varchar(255) default 'system'
);

create table if not exists chat_category(
    id bigint auto_increment primary key,
    name varchar(255) not null,
    parent_id bigint
);

alter table chat_room add foreign key (category_id) references chat_category(id);
alter table chat_category add foreign key (parent_id) references chat_category(id);
