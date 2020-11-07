<template>
  <div class="content no-padding-top">
    <div class="md-layout">
      <div class="md-layout-item md-xsmall-size-100 md-size-90 data-block vert-info-bar">
        <div class="flex-row">
          <p class="light-subtitle left-label">Customer name</p>
          <span>Faurecia Automative Composite</span>
        </div>
        <div class="vert-hr"></div>
        <div class="flex-row">
          <p class="light-subtitle left-label">Status</p>
          <span>Open</span>
        </div>
        <div class="vert-hr"></div>
        <div class="flex-row">
          <p class="light-subtitle left-label">Gate</p>
          <span>2</span>
        </div>
        <div class="vert-hr"></div>
        <div class="flex-row">
          <p class="light-subtitle left-label">Creation date</p>
          <span>2019/09/09</span>
        </div>
      </div>
      <div
        class="md-layout-item md-xsmall-size-20 md-size-7 data-block dash-notif-block"
        style="padding:0px"
      >
        <md-button class="md-icon-button md-just-icon">
          <feather type="bell"></feather>
        </md-button>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-size-66 transparent-block flex-space-between"
      >
        <md-tabs class="simple-tabs">
          <md-tab id="tab-specs" md-label="Specificities">Specificities</md-tab>
          <md-tab id="tab-reporting" md-label="Reporting">
            <div class="md-layout">
              <div
                class="md-layout-item md-medium-size-100 md-size-100 margin-bottom-20 data-block"
              >Program process et timeline</div>
              <div
                class="md-layout-item md-medium-size-100 md-size-100 margin-bottom-20 data-block"
              >Next steps</div>
              <div
                class="md-layout-item md-medium-size-100 md-size-100 margin-bottom-20 data-block"
              >Tasks</div>
            </div>
          </md-tab>
          <md-tab id="tab-risks" md-label="Risks">Risks tab</md-tab>
          <md-tab id="tab-costs" md-label="Costs">Costs tab</md-tab>
          <md-tab id="tab-contacts" md-label="Contacts">Contacts tab</md-tab>
        </md-tabs>
        <md-button class="md-icon-button md-just-icon margin-top-20">
          <feather type="edit-3"></feather>
        </md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-44 dashboard-right-panel">
        <div class="md-layout-item md-medium-size-50 md-size-100 transparent-block margin-top-20">
          <div class="md-layout-item md-size-100 text-align-left no-padding">
            <accordion
              :isActive="isEventActive"
              @isActive="isEventActive = $event"
              iconType="activity"
              title="Events"
            >
              <div class="md-layout-item md-size-100 buttons-list">
                <md-button class="md-tertiary">
                  <feather type="file-plus"></feather>Add a file
                </md-button>
              </div>
              <div class="md-layout-item md-size-100 buttons-list">
                <md-button class="md-tertiary">
                  <feather type="arrow-right-circle"></feather>Transfer to Gate
                  7
                </md-button>
              </div>
              <div class="md-layout-item md-size-100 buttons-list">
                <md-button class="md-tertiary">
                  <feather type="x-circle"></feather>Deny transfer
                </md-button>
              </div>
              <div class="md-layout-item md-size-100 buttons-list">
                <md-button class="md-tertiary">
                  <feather type="archive"></feather>Close program
                </md-button>
              </div>
            </accordion>
            <accordion
              :isActive="isCalendarActive"
              @isActive="isCalendarActive = $event"
              iconType="calendar"
              title="Calendar"
            >
              <p>Coming soon</p>
            </accordion>
            <accordion
              :isActive="isFilesActive"
              @isActive="isFilesActive = $event"
              iconType="file-text"
              title="Access Files"
            >
              <div
                class="md-layout-item md-size-50 light-subtitle text-align-left no-padding"
              >Last files added</div>

              <div class="md-layout-item md-size-100 duo-data-block no-padding">
                <div class="md-layout-item md-size-50 list-item">Gate passage report</div>
              </div>
              <div class="md-layout-item md-size-100 duo-data-block no-padding">
                <div class="md-layout-item md-size-50 list-item">File name is file name</div>
              </div>
              <div class="md-layout-item md-size-100 duo-data-block no-padding">
                <div class="md-layout-item md-size-50 list-item">File name is file name</div>
              </div>
              <div class="md-layout-item md-size-100 flex-justif-end">
                <md-button class="md-tertiary">
                  <feather type="corner-up-right"></feather>See more files
                </md-button>
              </div>
            </accordion>
            <accordion
              :isActive="isBacklogActive"
              @isActive="isBacklogActive = $event"
              iconType="calendar"
              title="Backlog"
            >
              <div
                class="md-layout-item md-size-50 light-subtitle text-align-left no-padding"
              >Last events</div>
              <div class="md-layout-item md-size-100 duo-data-block no-padding">
                <div class="md-layout-item md-size-50 icon-list-item">
                  <feather type="user-plus"></feather>Contact added
                </div>
              </div>
              <div class="md-layout-item md-size-100 duo-data-block no-padding">
                <div class="md-layout-item md-size-50 icon-list-item">
                  <feather type="arrow-right-circle"></feather>Gate transfer
                  requested
                </div>
              </div>
              <div class="md-layout-item md-size-100 duo-data-block no-padding">
                <div class="md-layout-item md-size-50 icon-list-item">
                  <feather type="file-plus"></feather>File added
                </div>
              </div>
              <div class="md-layout-item md-size-100 flex-justif-end">
                <md-button class="md-tertiary">
                  <feather type="corner-up-right"></feather>See more events
                </md-button>
              </div>
            </accordion>
          </div>
        </div>
        <div class="md-layout-item md-medium-size-50 md-size-100 transparent-block">
          <div class="md-layout-item md-size-100 flex-space-between no-padding">
            <div
              class="md-layout-item md-size-50 text-align-left no-padding flex-vert-align-center"
            >
              <h2>Team</h2>
            </div>
            <md-button class="md-icon-button md-just-icon">
              <feather type="edit-3"></feather>
            </md-button>
          </div>
          <div class="margin-bottom-10">
            <div class="md-layout-item md-size-100 duo-data-block">
              <div class="md-layout-item md-size-50 light-subtitle text-align-left">Araymond</div>
            </div>
            <div class="md-layout-item md-size-100 duo-data-block">
              <div class="md-layout-item md-size-50">Zaha Hadid</div>
              <div class="md-layout-item md-size-50">
                <p class="light-subtitle-small">Architect</p>
              </div>
            </div>
            <div class="md-layout-item md-size-100 duo-data-block">
              <div class="md-layout-item md-size-50">Jean-François de la Morinière</div>
              <div class="md-layout-item md-size-50">
                <p class="light-subtitle-small">Product Manager</p>
              </div>
            </div>
          </div>
          <div class="margin-bottom-10">
            <div class="md-layout-item md-size-100 duo-data-block">
              <div
                class="md-layout-item md-size-100 light-subtitle text-align-left"
              >Faureci Automative Composite</div>
            </div>
            <div class="md-layout-item md-size-100 duo-data-block">
              <div class="md-layout-item md-size-50">Zaha Hadid</div>
              <div class="md-layout-item md-size-50">
                <p class="light-subtitle-small">Architect</p>
              </div>
            </div>
            <div class="md-layout-item md-size-100 duo-data-block">
              <div class="md-layout-item md-size-50">Jacky Chan</div>
              <div class="md-layout-item md-size-50">
                <p class="light-subtitle-small">Process Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "@/components/Accordion";

export default {
  components: {
    accordion: Accordion
  },
  data() {
    return {
      isEventActive: false,
      isCalendarActive: false,
      isFilesActive: false,
      isBacklogActive: false
    };
  },
  methods: {}
};
</script>
