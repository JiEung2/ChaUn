package com.ssafy.health.domain.quest.entity;

import com.ssafy.health.common.entity.BaseEntity;
import com.ssafy.health.domain.account.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserQuest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private QuestStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quest_id")
    private Quest quest;

    @Builder
    public UserQuest(User user, Quest quest) {
        this.status = QuestStatus.CREATED;
        this.user = user;
        this.quest = quest;
    }

    public void updateStatus(QuestStatus status) {
        this.status = status;
    }
}
