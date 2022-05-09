package com.vms.configurable.mapper;

import com.vms.configurable.dto.ConfigurableDTO;
import com.vms.model.configurable.Configurable;
import org.mapstruct.Mapper;

@Mapper
public interface ConfigurableMapper {

    ConfigurableDTO toDTO(Configurable configurable);

    Configurable fromDTO(ConfigurableDTO dto);
}