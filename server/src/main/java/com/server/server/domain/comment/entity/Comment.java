package com.server.server.domain.comment.entity;

import com.server.server.domain.user.entity.User;
import com.server.server.domain.recipe.entity.Recipe;
import com.server.server.global.audit.Auditable;

import javax.persistence.*;

@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    @Column
    private String commentContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

}
