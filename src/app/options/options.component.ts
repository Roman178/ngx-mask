import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    Input,
    QueryList,
    ViewChildren,
} from '@angular/core';
import {
    AsyncPipe,
    JsonPipe,
    NgClass,
    NgFor,
    NgIf,
    NgOptimizedImage,
    NgTemplateOutlet,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { HighlightModule } from 'ngx-highlightjs';
import { IComDoc, IMaskOptions, TExample } from '@open-source/accordion/content.interfaces';
import { AssetPipe } from '@libraries/asset/asset.pipe';
import { IsEmptyPipe } from '@open-source/is-empty/is-empty.pipe';
import { ColorPipe } from '@open-source/color/color.pipe';
import { CardContentComponent } from '../shared/card-content/card-content.component';
import { TrackByService } from '@libraries/track-by/track-by.service';
import { Observable } from 'rxjs';
import { ScrollService } from '@open-source/scroll/scroll.service';
import { OpenSourcePath } from '@open-source/path/open-source.path';
import { ChangeAccordionService } from '../shared/service/change-accordion.service';

@Component({
    selector: 'jsdaddy-open-source-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    standalone: true,
    providers: [ScrollService, ChangeAccordionService],
    imports: [
        JsonPipe,
        NgFor,
        NgIf,
        NgClass,
        NgOptimizedImage,
        NgTemplateOutlet,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule,
        NgxMaskDirective,
        NgxMaskPipe,
        AssetPipe,
        IsEmptyPipe,
        ColorPipe,
        CardContentComponent,
        AsyncPipe,
    ],
})
export class OptionsComponent implements AfterViewInit {
    @Input() public cardDocs!: IComDoc[];
    @Input() public cardExamples!: (TExample<IMaskOptions> | { _pipe: string })[];

    @ViewChildren('cards') public cards!: QueryList<ElementRef>;

    public readonly phone = '123456789';
    public readonly trackByPath = inject(TrackByService).trackBy('id');
    public readonly activeCardId$: Observable<number> = inject(ScrollService).activeCard$;
    public readonly openSourcePath = OpenSourcePath.OPEN_SOURCE;

    private readonly scrollService = inject(ScrollService);
    private readonly changeAccordionService = inject(ChangeAccordionService);

    public ngAfterViewInit(): void {
        this.scrollService.onScroll(this.cards);
        this.changeAccordionService.onChangeAccordion(this.cards);
    }
}
