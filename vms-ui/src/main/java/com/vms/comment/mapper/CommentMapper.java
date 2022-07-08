package com.vms.comment.mapper;

import com.vms.comment.CommentService;
import com.vms.comment.dto.CommentDTO;
import com.vms.model.version.Comment;
import com.vms.model.version.Version;
import com.vms.user.mapper.UserMapper;
import com.vms.version.VersionService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.List;

@Mapper(
	componentModel = "spring",
	uses = {UserMapper.class, CommentService.class, VersionService.class}
)
public interface CommentMapper {

	@Mappings({
		@Mapping(target = "versionId", source = "appVersion", qualifiedByName = "versionToId"),
		@Mapping(target = "parentId", source = "parent", qualifiedByName = "parentToId")
	})
	CommentDTO toDTO(Comment comment);

	@Mappings({
		@Mapping(target = "appVersion", source = "versionId"),
		@Mapping(target = "parent", source = "parentId")
	})
	Comment fromDTO(CommentDTO dto);

	List<CommentDTO> toDTOs(List<Comment> comments);

	List<Comment> fromDTOs(List<CommentDTO> dtos);

	@Named("versionToId")
	default long versionToId(Version version) {
		return version.getId();
	}

	@Named("parentToId")
	default Long parentToId(Comment parent) {
		return parent == null ? null : parent.getId();
	}
}
